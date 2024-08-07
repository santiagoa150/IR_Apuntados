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
import { PlayerStatus } from './player-status';
import { Card } from '../card/card';
import { Trips } from '../card/trips';
import { Quads } from '../card/quads';

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
	constructor(
		@Inject(DatabaseConstants.PLAYER_PROVIDER) private readonly model: Model<PlayerDocument>,
	) {
	}

	/**
	 * Método que permite crear un jugador.
	 * @param {UserId} userId El id del usuario.
	 * @param {GameId} gameId El juego al que se asocia el jugador.
	 * @param {boolean} [validateUser=true] Determina si se debe validar el usuario.
	 * @returns {Player} El usuario creado.
	 */
	async create(userId: UserId, gameId: GameId, validateUser: boolean = true): Promise<Player> {
		this.logger.log(`[${this.create.name}] INIT :: userId: ${userId.toString()}, gameId: ${gameId.toString()}`);
		if (
			validateUser &&
			(await this.getActiveByUserId(userId, false))
		) throw new UserIsAlreadyPlayingException();
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
		for (const player of (await this.getByGame(match.gameId))) {
			const position: number = turns[Math.floor(Math.random() * turns.length)];
			turns.splice(turns.indexOf(position), 1);
			const newStatus: PlayerStatus = new PlayerStatus(position === 1 ? PlayerStatusConstants.IN_TURN : PlayerStatusConstants.WAITING_TURN);
			player.position = position;
			player.status = newStatus;
			player.score = 0;

			const trip1: Card[] = [], trip2: Card[] = [], quads: Card[] = [];

			for (let i = 0; i < (position === 1 ? 11 : 10); i++) {
				const random: number = Math.floor(Math.random() * match.cardDeck.cards.length);
				if (i < 3) trip1.push(match.cardDeck.cards[random]);
				else if (i < 6) trip2.push(match.cardDeck.cards[random]);
				else if (i < 10) quads.push(match.cardDeck.cards[random]);
				else player.kicker = match.cardDeck.cards[random];
				match.cardDeck.cards.splice(random, 1);
			}

			player.trips1 = trip1 as Trips;
			player.trips2 = trip2 as Trips;
			player.quads = quads as Quads;
			const { playerId, ...toUpdate } = await player.toDTO();
			await this.model.updateOne({ playerId }, toUpdate);
		}
		this.logger.log(`[${this.dealCards.name}] FINISH ::`);
		return match;
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
		const mapped: Player[] = await Promise.all(found.map(p => Player.fromDTO(p)));
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
			}));
		this.logger.log(`[${this.getWithUserByGame.name}] FINISH ::`);
		return mapped;
	}
}