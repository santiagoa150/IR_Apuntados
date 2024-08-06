import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { MatchDocument } from '../database/match.schema';
import { Match } from './match';
import { Game } from '../game/game';
import { GameStatusConstants } from '../game/game-status.constants';
import { MatchCannotBeStartedException } from './exceptions/match-cannot-be-started.exception';
import { UserId } from '../user/user-id';
import {
	OnlyGameHostCanStartTheMatchException,
} from './exceptions/only-game-host-can-start-the-match.exception';
import { MatchStatusConstants } from './match-status.constants';
import { MatchId } from './match-id';
import { CardTypeConstants } from '../card/card-type.constants';
import { CardSuitConstants } from '../card/card-suit.constants';
import { CardDTO } from '../card/card';
import { CardValueConstants } from '../card/card-value.constants';
import { GameService } from '../game/game.service';
import { EventBus } from '@nestjs/cqrs';
import { MatchStartedEvent } from '../game/events/match-started/match-started.event';

/**
 * Los servicios asociados a las partidas.
 */
@Injectable()
export class MatchService {

	private readonly logger: Logger = new Logger(MatchService.name);
	private readonly defaultCardDeck: CardDTO[];

	/**
	 * @param gameService Servicios de los juegos.
	 * @param eventBus Bus de eventos de CQRS.
	 * @param {Model<MatchDocument>} model Modelo para interactuar con la base de datos de las partidas.
	 */
	constructor(
		private readonly gameService: GameService,
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
	 */
	async startByPlayer(userId: UserId, game: Game): Promise<Match> {
		this.logger.log(`[${this.startByPlayer.name}] INIT :: user: ${userId}, game: ${game.gameId.toString()}`);
		if (!game.status.is(GameStatusConstants.WAITING_TO_START)) throw new MatchCannotBeStartedException();
		if (game.hostId.toString() !== userId.toString()) {
			throw new OnlyGameHostCanStartTheMatchException();
		}
		game.changeStatus(GameStatusConstants.ACTIVE);
		const defaultCards: CardDTO[] = game.currentPlayers < 4 ? this.defaultCardDeck : [...this.defaultCardDeck, ...this.defaultCardDeck];
		const match: Match = await Match.fromDTO({
			gameId: game.gameId.toString(),
			status: MatchStatusConstants.PLAYING,
			currentPlayers: game.currentPlayers,
			initialPlayers: game.currentPlayers,
			matchId: MatchId.create(),
			currentShift: 1,
			totalShifts: 1,
			cardDeck: { cards: defaultCards },
			discardedCards: { cards: [] },
		});
		await new this.model(await match.toDTO()).save();
		await this.gameService.update(game);
		await this.eventBus.publish(new MatchStartedEvent(game, match));
		this.logger.log(`[${this.startByPlayer.name}] FINISH ::`);
		return match;
	}
}