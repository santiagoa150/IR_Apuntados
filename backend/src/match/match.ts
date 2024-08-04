import { ApiProperty } from '@nestjs/swagger';
import { CardDeck, CardDeckDTO } from './card-deck';
import { DiscardedCards, DiscardedCardsDTO } from './discarded-cards';
import { DomainBase } from '../shared/domain.base';
import { GameId } from '../game/game-id';
import { MatchId } from './match-id';
import { MatchStatus } from './match-status';

/**
 * El objeto de transferencia de datos de una partida.
 */
export class MatchDTO {
	@ApiProperty() gameId: string;
	@ApiProperty() matchId: string;
	@ApiProperty() initialPlayers: number;
	@ApiProperty() currentPlayers: number;
	@ApiProperty() currentShift: number;
	@ApiProperty() totalShifts: number;
	@ApiProperty() status: string;
	@ApiProperty({ type: DiscardedCardsDTO }) discardedCards: DiscardedCardsDTO;
	@ApiProperty({ type: CardDeckDTO }) cardDeck: CardDeckDTO;
}

/**
 * Clase que representa las partidas del sistema.
 * @extends {DomainBase<MatchDTO>}
 */
export class Match extends DomainBase<MatchDTO> {

	private readonly _gameId: GameId;
	private readonly _matchId: MatchId;
	private readonly _status: MatchStatus;
	private readonly _initialPlayers: number;
	private readonly _currentPlayers: number;
	private readonly _currentShift: number;
	private readonly _totalShifts: number;
	private readonly _discardedCards: DiscardedCards;
	private readonly _cardDeck: CardDeck;

	/**
	 * @param gameId El id del juego al que pertenece la partida.
	 * @param matchId El identificador único de la partida.
	 * @param status El estado actual de la partida.
	 * @param initialPlayers La cantidad inicial de jugadores.
	 * @param currentPlayers La cantidad actual de jugadores.
	 * @param currentShift El turno actual de la partida.
	 * @param totalShifts La cantidad de turnos que lleva o tuvo la partida.
	 * @param discardedCards Las cartas desechadas.
	 * @param cardDeck El mazo de la partida.
	 */
	constructor(
		gameId: GameId,
		matchId: MatchId,
		status: MatchStatus,
		initialPlayers: number,
		currentPlayers: number,
		currentShift: number,
		totalShifts: number,
		discardedCards: DiscardedCards,
		cardDeck: CardDeck,
	) {
		super();
		this._gameId = gameId;
		this._matchId = matchId;
		this._status = status;
		this._initialPlayers = initialPlayers;
		this._currentPlayers = currentPlayers;
		this._currentShift = currentShift;
		this._totalShifts = totalShifts;
		this._discardedCards = discardedCards;
		this._cardDeck = cardDeck;
	}

	get gameId(): GameId {
		return this._gameId;
	}

	get matchId(): MatchId {
		return this._matchId;
	}

	get status(): MatchStatus {
		return this._status;
	}

	get initialPlayers(): number {
		return this._initialPlayers;
	}

	get currentPlayers(): number {
		return this._currentPlayers;
	}

	get currentShift(): number {
		return this._currentShift;
	}

	get totalShifts(): number {
		return this._totalShifts;
	}

	get discardedCards(): DiscardedCards {
		return this._discardedCards;
	}

	get cardDeck(): CardDeck {
		return this._cardDeck;
	}

	/**
	 * Convierte el objeto de transferencia de datos de una partida en su modelo de dominio.
	 * @param {MatchDTO} dto El objeto de transferencia de datos siendo mapeado.
	 * @returns {Match} La nueva partida.
	 */
	static async fromDTO(dto: MatchDTO): Promise<Match> {
		return new Match(
			new GameId(dto.gameId),
			new MatchId(dto.matchId),
			new MatchStatus(dto.status),
			dto.initialPlayers,
			dto.currentPlayers,
			dto.currentShift,
			dto.totalShifts,
			await DiscardedCards.fromDTO(dto.discardedCards),
			await CardDeck.fromDTO(dto.cardDeck),
		);
	}

	/**
	 * Convierte la partida en su objeto de transferencia de datos.
	 * @returns El nuevo objeto de transferencia de datos.
	 */
	async toDTO(): Promise<MatchDTO> {
		return {
			cardDeck: await this._cardDeck.toDTO(),
			currentPlayers: this._currentPlayers,
			currentShift: this._currentShift,
			discardedCards: await this._discardedCards.toDTO(),
			gameId: this._gameId.toString(),
			initialPlayers: this._initialPlayers,
			matchId: this._matchId.toString(),
			status: this._status.toString(),
			totalShifts: this._totalShifts,
		};
	}
}