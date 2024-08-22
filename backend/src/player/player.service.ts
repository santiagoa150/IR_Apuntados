import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model, PipelineStage } from 'mongoose';
import { PlayerDocument } from '../database/player.schema';
import { Player, PlayerDTO } from './player';
import { UserId } from '../user/user-id';
import { GameId } from '../game/game-id';
import { UserIsAlreadyPlayingException } from '../user/exceptions/user-is-already-playing.exception';
import { PlayerNotFoundException } from './exceptions/player-not-found.exception';
import { PlayerId } from './player-id';
import { PlayerStatusConstants } from './player-status.constants';
import { PlayerWithUserDTO } from './player-with-user.dto';
import { PlayerQueries } from './player.queries';
import { Match } from '../match/match';
import { Card } from '../card/card';
import { Trips } from '../card/trips';
import { Quads } from '../card/quads';
import { Game } from '../game/game';
import { GameStatusConstants } from '../game/game-status.constants';
import { InvalidGameStatusException } from '../game/exceptions/invalid-game-status.exception';
import { MatchStatusConstants } from '../match/match-status.constants';
import { InvalidMatchStatusException } from '../match/exceptions/invalid-match-status.exception';
import { PlayerDoesNotHaveThisCardException } from './exceptions/player-does-not-have-this-card.exception';
import { InvalidPlayerStatusException } from './exceptions/invalid-player-status.exception';
import { PlayerAlreadyPullCardException } from './exceptions/player-already-pull-card.exception';

/**
 * Los servicios asociados a los jugadores.
 */
@Injectable()
export class PlayerService {
	private readonly logger: Logger = new Logger(PlayerService.name);

	/**
	 * @param {Model<PlayerDocument>} model Modelo para interactuar con la
	 * base de datos de los jugadores.
	 */
	constructor(@Inject(DatabaseConstants.PLAYER_PROVIDER) private readonly model: Model<PlayerDocument>) {}

	/**
	 * Método que permite crear un jugador.
	 * @param {UserId} userId El id del usuario.
	 * @param {GameId} gameId El juego al que se asocia el jugador.
	 * @param {boolean} [validateUser=true] Determina si se debe validar el usuario.
	 * @returns {Player} El usuario creado.
	 */
	async create(userId: UserId, gameId: GameId, validateUser: boolean = true): Promise<Player> {
		this.logger.log(`[${this.create.name}] INIT :: userId: ${userId.toString()}, gameId: ${gameId.toString()}`);
		if (validateUser && (await this.getActiveByUserId(userId, false))) throw new UserIsAlreadyPlayingException();
		const player: Player = await Player.fromDTO({
			gameId: gameId.toString(),
			isActive: true,
			playerId: PlayerId.create(),
			status: PlayerStatusConstants.WAITING_GAME,
			userId: userId.toString(),
		});
		await new this.model(await player.toDTO()).save();
		this.logger.log(`[${this.create.name}] FINISH ::`);
		return player;
	}

	/**
	 * Método que permite repartir las cartas a los jugadores de una partida.
	 * @param {Match} match La partida en la que se reparten las cartas.
	 * @returns {Match} La partida después de haber repartido las cartas.
	 */
	async dealCards(match: Match): Promise<Match> {
		this.logger.log(`[${this.dealCards.name}] INIT :: match: ${match.matchId.toString()}`);
		const turns: number[] = Array.from({ length: match.currentPlayers }, (_, i) => i + 1);
		for (const player of await this.getByGame(match.gameId)) {
			const cardsMap: Map<string, number> = new Map<string, number>();
			const position: number = turns[Math.floor(Math.random() * turns.length)];
			turns.splice(turns.indexOf(position), 1);
			player.position = position;
			player.changeStatus(position === 1 ? PlayerStatusConstants.IN_TURN : PlayerStatusConstants.WAITING_TURN);
			player.score = 0;

			const trip1: Card[] = [],
				trip2: Card[] = [],
				quads: Card[] = [];

			for (let i = 0; i < (position === 1 ? 11 : 10); i++) {
				const random: number = Math.floor(Math.random() * match.cardDeck.cards.length);
				const card: Card = match.cardDeck.cards[random];
				if (i < 3) trip1.push(card);
				else if (i < 6) trip2.push(card);
				else if (i < 10) quads.push(card);
				else player.kicker = card;
				match.cardDeck.cards.splice(random, 1);

				const mapId: string = card.type.toString() + card.suit.toString();
				if (cardsMap.has(mapId)) cardsMap.set(mapId, cardsMap.get(mapId) + 1);
				else cardsMap.set(mapId, 1);
			}

			player.trips1 = trip1 as Trips;
			player.trips2 = trip2 as Trips;
			player.quads = quads as Quads;
			player.cardsMap = cardsMap;
			await this.update(player);
		}
		this.logger.log(`[${this.dealCards.name}] FINISH ::`);
		return match;
	}

	/**
	 * Método que permite que un usuario pase el turno en una partida.
	 * - Actualiza el jugador con el turno actual.
	 * - Determina el jugador con el turno siguiente.
	 * @param {UserId} userId El usuario que pasa el turno.
	 * @param {Game} game El juego en el que se está pasando turno.
	 * @param {Match} match La partida actual del juego.
	 * @param {Trips} trips1 La nueva terna 1 del jugador.
	 * @param {Trips} trips2 La nueva terna 2 del jugador.
	 * @param {Quads} quads La nueva cuarta del jugador.
	 * @param {Card} kicker La sobrante del jugador.
	 * @returns {Player} El jugador actualizado.
	 * @throws {InvalidGameStatusException} Cuando se intenta pasar turno en un juego que no está activo.
	 * @throws {InvalidMatchStatusException} Cuando se intenta pasar turno en una partida en la que no se está jugando.
	 * @throws {InvalidPlayerStatusException} Cuando un usuario que no está en turno ejecuta la acción.
	 * @throws {PlayerDoesNotHaveThisCardException} Cuando se intenta actualizar la posición de una carta que no tiene el jugador.
	 */
	async passShift(
		userId: UserId,
		game: Game,
		match: Match,
		trips1: Trips,
		trips2: Trips,
		quads: Quads,
		kicker: Card,
	): Promise<{ player: Player; nextPlayer: Player }> {
		this.logger.log(`[${this.passShift.name}] INIT :: userId: ${userId?.toString()}`);
		if (!game.status.is(GameStatusConstants.ACTIVE)) throw new InvalidGameStatusException();
		if (!match.status.is(MatchStatusConstants.PLAYING)) throw new InvalidMatchStatusException();
		const player: Player = await this.getActiveByUserId(userId);
		if (!player.status.is(PlayerStatusConstants.IN_TURN)) throw new InvalidPlayerStatusException();

		/* Las validaciones del usuario. */
		const cardsMapCopy: Map<string, number> = new Map(player.cardsMap);
		const validateCard = (c: Card) => {
			const cardIdentifier: string = c.type.toString() + c.suit.toString();
			if (cardsMapCopy.has(cardIdentifier)) {
				const total: number = cardsMapCopy.get(cardIdentifier);
				if (total <= 0) throw new PlayerDoesNotHaveThisCardException();
				cardsMapCopy.set(cardIdentifier, total - 1);
			}
		};

		/* Actualización de los datos del jugador. */
		trips1.forEach((c) => validateCard(c));
		trips2.forEach((c) => validateCard(c));
		quads.forEach((c) => validateCard(c));
		validateCard(kicker);
		player.trips1 = trips1;
		player.trips2 = trips2;
		player.quads = quads;
		player.kicker = null;
		player.changeStatus(PlayerStatusConstants.WAITING_TURN);

		/* Ajusta los datos del siguiente jugador. */
		const nextPlayer: Player = await this.getByGameAndPosition(game.gameId, match.getNextPosition(player.position));
		nextPlayer.changeStatus(PlayerStatusConstants.IN_TURN);

		await this.update(player);
		await this.update(nextPlayer);

		this.logger.log(`[${this.passShift.name}] FINISH ::`);
		return { player, nextPlayer };
	}

	/**
	 * Permite que un usuario jale una carta desde el mazo.
	 * @param userId El usuario que está jalando la carta del mazo.
	 * @param gameId El juego en el que se está jalando la carta.
	 * @param match La partida en la que se está jalando la carta.
	 * @returns Retorna el jugador y la partida actualizados.
	 * @throws {InvalidMatchStatusException} Cuando se intenta jalar del mazo en una partida que no se está jugando, ni tocando.
	 * @throws {InvalidPlayerStatusException} Cuando un usuario que no está en turno ejecuta la acción.
	 */
	async pullFromCardDeck(
		userId: UserId,
		gameId: GameId,
		match: Match,
	): Promise<{
		player: Player;
		match: Match;
		filledDeck: boolean;
	}> {
		this.logger.log(
			`[${this.pullFromCardDeck.name}] INIT :: user: ${userId.toString()} game: ${gameId.toString()}`,
		);
		if (!match.status.is(MatchStatusConstants.PLAYING) && !match.status.is(MatchStatusConstants.TOUCHING)) {
			throw new InvalidMatchStatusException();
		}
		const player: Player = await this.getActiveByUserId(userId);
		if (!player.status.is(PlayerStatusConstants.IN_TURN)) throw new InvalidPlayerStatusException();
		if (player.kicker) throw new PlayerAlreadyPullCardException();
		const pulledCard = match.pullFromDeck();
		player.kicker = pulledCard.card;
		await this.update(player);
		this.logger.log(`[${this.pullFromCardDeck.name}] FINISH ::`);
		return { player, match, filledDeck: pulledCard.filledDeck };
	}

	/**
	 * Actualiza los datos de un jugador.
	 * @param {Player} player El jugador que será actualizado.
	 */
	async update(player: Player): Promise<void> {
		this.logger.log(`[${this.update.name}] INIT :: id: ${player.playerId.toString()}`);
		const { playerId, ...toUpdate } = await player.toDTO();
		await this.model.updateOne({ playerId }, toUpdate);
		this.logger.log(`[${this.update.name}] FINISH ::`);
	}

	/**
	 * Método que permite buscar un jugador por su userId y validar su existencia.
	 * @param {UserId} userId El jugador que se solicita.
	 * @param {boolean} [throwExceptionIfNotFound=true] Bandera para determinar si se debe lanzar
	 * una excepción cuando el jugador solicitado no existe.
	 * @returns {Promise<Player | undefined>} Se retorna el jugador solicitado cuando se encuentra,
	 * si la bandera throwExceptionIfNotFound=false y el jugador solicitado no existe se retorna undefined.
	 * @throws {PlayerNotFoundException} Se lanza cuando la bandera throwExceptionIfNotFound=true y el jugador solicitado
	 * no existe.
	 */
	async getActiveByUserId(userId: UserId, throwExceptionIfNotFound: boolean = true): Promise<Player | undefined> {
		this.logger.log(`[${this.getActiveByUserId.name}] INIT :: userId: ${userId.toString()}`);
		const found: PlayerDTO = await this.model.findOne({ userId: userId.toString(), isActive: true });
		const mapped: Player = found ? await Player.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new PlayerNotFoundException();
		this.logger.log(`[${this.getActiveByUserId.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Método que permite buscar todos los participantes de un juego.
	 * @param {GameId} gameId El juego solicitado.
	 * @returns {Promise<Player[]>} Los jugadores encontrados.
	 */
	async getByGame(gameId: GameId): Promise<Player[]> {
		this.logger.log(`[${this.getByGame.name}] INIT :: game: ${gameId?.toString()}`);
		const found: PlayerDocument[] = await this.model.find({ gameId: gameId.toString() });
		const mapped: Player[] = await Promise.all(found.map((p) => Player.fromDTO(p)));
		this.logger.log(`[${this.getByGame.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Método que permite buscar los participantes de un juego con la
	 * información de sus usuarios.
	 * @param {GameId} gameId El juego solicitado.
	 * @param {UserId} userId El usuario que ejecuta el servicio.
	 * @returns {Promise<Array<PlayerWithUserDTO>>} Los jugadores encontrados.
	 */
	async getWithUserByGame(gameId: GameId, userId: UserId): Promise<PlayerWithUserDTO[]> {
		this.logger.log(`[${this.getWithUserByGame.name}] INIT :: gameId: ${gameId.toString()}`);
		const query: Array<PipelineStage> = PlayerQueries.getWithUserByGame(gameId);
		const aggregateResponse: Array<PlayerWithUserDTO & { _id: string }> = await this.model.aggregate(query);
		const mapped: Array<PlayerWithUserDTO> = await Promise.all(
			aggregateResponse.map(async (e): Promise<PlayerWithUserDTO> => {
				return {
					cardDesignId: e.cardDesignId,
					cardDesignName: e.cardDesignName,
					icon: e.icon,
					isActive: e.isActive,
					playerId: e.playerId,
					position: e.position,
					score: e.score,
					status: e.status,
					userId: e.userId,
					username: e.username,
					isMarked: userId.toString() === e.userId,
				};
			}),
		);
		this.logger.log(`[${this.getWithUserByGame.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Busca un jugador por un juego y su posición.
	 * @param {GameId} gameId El juego al que pertenece el jugador.
	 * @param {number} position La posición del jugador solicitado.
	 * @param {boolean} [throwExceptionIfNotFound=true] Determina si se debe lanzar una excepción cuando un jugador no se encuentra.
	 * @throws {PlayerNotFoundException} Si el booleano throwExceptionIfNotFound es verdadero y el jugador no se encuentra.
	 * @returns {Player} El jugador solicitado.
	 */
	async getByGameAndPosition(
		gameId: GameId,
		position: number,
		throwExceptionIfNotFound: boolean = true,
	): Promise<Player> {
		this.logger.log(`[${this.getByGameAndPosition.name}] INIT :: game: ${gameId.toString()} pos: ${position}`);
		const found: PlayerDocument = await this.model.findOne({ gameId: gameId.toString(), position });
		const mapped: Player = found ? await Player.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new PlayerNotFoundException();
		this.logger.log(`[${this.getByGameAndPosition.name}] FINISH ::`);
		return mapped;
	}
}
