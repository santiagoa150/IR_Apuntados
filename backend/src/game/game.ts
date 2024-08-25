import { ApiProperty } from '@nestjs/swagger';
import { DomainBase } from '../shared/domain.base';
import { GameId } from './game-id';
import { UserId } from '../user/user-id';
import { GameStatus } from './game-status';
import { GameStatusConstants } from './game-status.constants';
import { GameIsAlreadyStartedException } from './exceptions/game-is-already-started.exception';
import { GameCannotBeStartedException } from './exceptions/game-cannot-be-started.exception';
import { MatchId } from '../match/match-id';

/**
 * Clase que representa el objeto de transferencia de un juego.
 * @class
 */
export class GameDTO {
	@ApiProperty() gameId: string;
	@ApiProperty() creatorId: string;
	@ApiProperty() hostId: string;
	@ApiProperty() status: string;
	@ApiProperty() name: string;
	@ApiProperty() requiredPlayers: number;
	@ApiProperty() currentPlayers: number;
	@ApiProperty() betByPlayer: number;
	@ApiProperty() isPublic: boolean;
	@ApiProperty() wasInitiated: boolean;
	@ApiProperty() currentMatch?: string;
}

/**
 * Clase que representa un juego y sus acciones disponibles.
 *
 * @class
 * @extends {DomainBase<GameDTO>}
 */
export class Game extends DomainBase<GameDTO> {

	public readonly gameId: GameId;
	public readonly status: GameStatus;
	public readonly betByPlayer: number;
	public readonly creatorId: UserId;
	private readonly _hostId: UserId;
	private readonly name: string;
	private readonly requiredPlayers: number;
	private readonly isPublic: boolean;

	/**
	 * @param {GameId} gameId El ID del juego.
	 * @param {UserId} creatorId El ID del creador del juego.
	 * @param {UserId} hostId El ID del host del juego.
	 * @param {GameStatus} status El estado del juego.
	 * @param {string} name El nombre del juego.
	 * @param {number} requiredPlayers El total de jugadores requeridos
	 * para iniciar el juego.
	 * @param {number} currentPlayers El total de jugadores actuales.
	 * @param {number} betByPlayer El valor de apuesta por cada jugador.
	 * @param {boolean} isPublic Bandera que determina si el juego es público.
	 * @param {boolean} wasInitiated Bandera que determina si un juego ya se inició.
	 * @param {MatchId} currentMatch La partida actual del juego.
	 */
	constructor(
		gameId: GameId,
		creatorId: UserId,
		hostId: UserId,
		status: GameStatus,
		name: string,
		requiredPlayers: number,
		currentPlayers: number,
		betByPlayer: number,
		isPublic: boolean,
		wasInitiated: boolean,
		currentMatch: MatchId | undefined,
	) {
		super();
		this.gameId = gameId;
		this.creatorId = creatorId;
		this._hostId = hostId;
		this.status = status;
		this.name = name;
		this.requiredPlayers = requiredPlayers;
		this._currentPlayers = currentPlayers;
		this.betByPlayer = betByPlayer;
		this.isPublic = isPublic;
		this._wasInitiated = wasInitiated;
		this._currentMatch = currentMatch;
	}

	private _currentMatch?: MatchId;

	set currentMatch(value: MatchId) {
		this._currentMatch = value;
	}

	get currentMatch(): MatchId {
		return this._currentMatch;
	}

	get hostId(): UserId {
		return this._hostId;
	}

	private _wasInitiated: boolean;

	get wasInitiated(): boolean {
		return this._wasInitiated;
	}

	private _currentPlayers: number;

	get currentPlayers(): number {
		return this._currentPlayers;
	}

	/**
	 * Convierte el objeto de transferencia de un juego al modelo de dominio.
	 * @param {GameDTO} dto El objeto de transferencia.
	 * @returns {Game} El modelo de dominio.
	 * @static
	 */
	static fromDTO(dto: GameDTO): Game {
		return new Game(
			new GameId(dto.gameId),
			new UserId(dto.creatorId),
			new UserId(dto.hostId),
			new GameStatus(dto.status),
			dto.name,
			dto.requiredPlayers,
			dto.currentPlayers,
			dto.betByPlayer,
			dto.isPublic,
			dto.wasInitiated,
			dto.currentMatch ? new MatchId(dto.currentMatch) : undefined,
		);
	}

	/**
	 * Convierte el juego a su objeto de transferencia.
	 * @returns {GameDTO} El objeto de transferencia del juego.
	 */
	toDTO(): GameDTO {
		return {
			gameId: this.gameId.toString(),
			status: this.status.toString(),
			betByPlayer: this.betByPlayer,
			creatorId: this.creatorId.toString(),
			name: this.name,
			isPublic: this.isPublic,
			currentPlayers: this._currentPlayers,
			requiredPlayers: this.requiredPlayers,
			wasInitiated: this._wasInitiated,
			hostId: this._hostId.toString(),
			currentMatch: this._currentMatch?.toString(),
		};
	}

	/**
	 * Función que permite agregar un jugador al juego.
	 */
	addPlayer(): void {
		this._currentPlayers++;
		if (this._currentPlayers === this.requiredPlayers) this.changeStatus(GameStatusConstants.WAITING_TO_START);
	}

	/**
	 * Función que permite cambiar el estado de un juego, haciendo las
	 * respectivas validaciones.
	 * @param {GameStatusConstants} status El nuevo estado del juego.
	 * @throws {GameIsAlreadyStartedException} Se lanza si un juego ya ha sido empezado y se intenta ingresar a un juego.
	 * @throws {GameCannotBeStartedException} Se lanza si el juego aún no está esperando para empezar.
	 */
	changeStatus(
		status: GameStatusConstants,
	): void {
		switch (status) {
		case GameStatusConstants.WAITING_TO_START: {
			if (!this.status.is(GameStatusConstants.WAITING_PLAYERS)) throw new GameIsAlreadyStartedException();
			break;
		}
		case GameStatusConstants.ACTIVE: {
			if (!this.status.is(GameStatusConstants.WAITING_TO_START)) throw new GameCannotBeStartedException();
			this._wasInitiated = true;
			break;
		}
		}
		this.status.change(status);
	}
}