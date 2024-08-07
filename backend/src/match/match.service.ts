import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { MatchDocument } from '../database/match.schema';
import { Match } from './match';
import { Game } from '../game/game';
import { GameStatusConstants } from '../game/game-status.constants';
import { MatchCannotBeStartedException } from './exceptions/match-cannot-be-started.exception';
import { UserId } from '../user/user-id';
import { OnlyGameHostCanStartTheMatchException } from './exceptions/only-game-host-can-start-the-match.exception';
import { MatchStatusConstants } from './match-status.constants';
import { MatchId } from './match-id';
import { CardTypeConstants } from '../card/card-type.constants';
import { CardSuitConstants } from '../card/card-suit.constants';
import { CardDTO } from '../card/card';
import { CardValueConstants } from '../card/card-value.constants';
import { GameService } from '../game/game.service';
import { EventBus } from '@nestjs/cqrs';
import { MatchStartedEvent } from '../game/events/match-started/match-started.event';
import { PlayerService } from '../player/player.service';
import { MatchNotFoundException } from './exceptions/match-not-found.exception';

/**
 * Los servicios asociados a las partidas.
 */
@Injectable()
export class MatchService {

	private readonly logger: Logger = new Logger(MatchService.name);
	private readonly defaultCardDeck: CardDTO[];

	/**
	 * @param gameService Servicios de los juegos.
	 * @param playerService Los servicios de los jugadores.
	 * @param eventBus Bus de eventos de CQRS.
	 * @param {Model<MatchDocument>} model Modelo para interactuar con la base de datos de las partidas.
	 */
	constructor(
		private readonly gameService: GameService,
		private readonly playerService: PlayerService,
		private readonly eventBus: EventBus,
		@Inject(DatabaseConstants.MATCH_PROVIDER) private readonly model: Model<MatchDocument>,
	) {
		this.defaultCardDeck = MatchService.generateDefaultCardDeck();
	}

	/**
	 * Método que genera las cartas por defecto de un mazo de cartas.
	 * @returns Las objetos de transferencia de datos de las cartas.
	 */
	static generateDefaultCardDeck(): CardDTO[] {
		const types: CardTypeConstants[] = Object.values(CardTypeConstants);
		const suits: CardSuitConstants[] = Object.values(CardSuitConstants);
		return types.flatMap((type) =>
			suits.map((suit): CardDTO => {
				return { type, suit, value: CardValueConstants[type] };
			}),
		);
	}

	/**
	 * Método que inicia una partida por un jugador.
	 * @param userId El jugador que inicia la partida.
	 * @param game El juego iniciado.
	 * @returns La partida generada.
	 * @throws {MatchCannotBeStartedException} Cuando la partida no está lista para ser iniciada.
	 * @throws {OnlyGameHostCanStartTheMatchException} Indica que solo el host de la partida puede iniciar la partida.
	 */
	async startByPlayer(userId: UserId, game: Game): Promise<Match> {
		this.logger.log(`[${this.startByPlayer.name}] INIT :: user: ${userId}, game: ${game.gameId.toString()}`);
		if (!game.status.is(GameStatusConstants.WAITING_TO_START)) throw new MatchCannotBeStartedException();
		if (game.hostId.toString() !== userId.toString()) {
			throw new OnlyGameHostCanStartTheMatchException();
		}
		const matchId: MatchId = new MatchId(MatchId.create());
		game.changeStatus(GameStatusConstants.ACTIVE);
		game.currentMatch = matchId;
		const defaultCards: CardDTO[] = game.currentPlayers < 4 ? this.defaultCardDeck : [...this.defaultCardDeck, ...this.defaultCardDeck];
		let match: Match = await Match.fromDTO({
			gameId: game.gameId.toString(),
			status: MatchStatusConstants.PLAYING,
			currentPlayers: game.currentPlayers,
			initialPlayers: game.currentPlayers,
			matchId: matchId.toString(),
			currentShift: 1,
			totalShifts: 1,
			cardDeck: { cards: defaultCards },
			discardedCards: { cards: [] },
		});
		match = await this.playerService.dealCards(match);
		await new this.model(await match.toDTO()).save();
		await this.gameService.update(game);
		await this.eventBus.publish(new MatchStartedEvent(game, match));
		this.logger.log(`[${this.startByPlayer.name}] FINISH ::`);
		return match;
	}

	/**
	 * Método que busca una partida por su id y opcionalmente permite lanzar una excepción si no se encuentra.
	 * @param {MatchId} matchId La partida solicitada.
	 * @param {boolean} [throwExceptionIfNotFound=true] Booleano que determina si se debe lanzar una excepción cuando la partida no se encuentra.
	 * @returns {Promise<Match>} La partida encontrada.
	 * @throws {MatchNotFoundException} Si el booleano throwExceptionIfNotFound es verdadero y la partida no se encuentra.
	 */
	async getById(matchId: MatchId, throwExceptionIfNotFound: boolean = true): Promise<Match> {
		this.logger.log(`[${this.getById.name}] INIT :: matchId: ${matchId?.toString()}`);
		const found: MatchDocument = await this.model.findOne({ matchId: matchId.toString() });
		const mapped: Match = found ? await Match.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new MatchNotFoundException();
		this.logger.log(`[${this.getById.name}] FINISH ::`);
		return mapped;
	}
}