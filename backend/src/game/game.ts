import { ApiProperty } from '@nestjs/swagger';
import { DomainBase } from '../shared/domain.base';
import { GameId } from './game-id';
import { UserId } from '../user/user-id';
import { GameStatus } from './game-status';
import { GameStatusConstants } from './game-status.constants';
import { GameIsAlreadyStartedException } from './exceptions/game-is-already-started.exception';

/**
 * Clase que representa el objeto de transferencia de un juego.
 * @class
 */
export class GameDTO {
	@ApiProperty() gameId: string;
	@ApiProperty() creatorId: string;
	@ApiProperty() status: string;
	@ApiProperty() name: string;
	@ApiProperty() requiredPlayers: number;
	@ApiProperty() currentPlayers: number;
	@ApiProperty() betByPlayer: number;
	@ApiProperty() isPublic: boolean;
	@ApiProperty() wasInitiated: boolean;
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
	public readonly wasInitiated: boolean;
	private readonly creatorId: UserId;
	private readonly name: string;
	private readonly requiredPlayers: number;
	private currentPlayers: number;
	private readonly isPublic: boolean;

	/**
	 * @param {GameId} gameId El ID del juego.
	 * @param {UserId} creatorId El ID del creador del juego.
	 * @param {GameStatus} status El estado del juego.
	 * @param {string} name El nombre del juego.
	 * @param {number} requiredPlayers El total de jugadores requeridos
	 * para iniciar el juego.
	 * @param {number} currentPlayers El total de jugadores actuales.
	 * @param {number} betByPlayer El valor de apuesta por cada jugador.
	 * @param {boolean} isPublic Bandera que determina si el juego es público.
	 * @param {boolean} wasInitiated Bandera que determina si un juego ya se inició.
	 */
	constructor(
		gameId: GameId,
		creatorId: UserId,
		status: GameStatus,
		name: string,
		requiredPlayers: number,
		currentPlayers: number,
		betByPlayer: number,
		isPublic: boolean,
		wasInitiated: boolean,
	) {
		super();
		this.gameId = gameId;
		this.creatorId = creatorId;
		this.status = status;
		this.name = name;
		this.requiredPlayers = requiredPlayers;
		this.currentPlayers = currentPlayers;
		this.betByPlayer = betByPlayer;
		this.isPublic = isPublic;
		this.wasInitiated = wasInitiated;
	}

	/**
	 * Convierte el objeto de transferencia de un juego al modelo de dominio.
	 * @param {GameDTO} dto El objeto de transferencia.
	 * @returns {Game} El modelo de dominio.
	 * @static
	 */
	static fromDto(dto: GameDTO): Game {
		return new Game(
			new GameId(dto.gameId),
			new UserId(dto.creatorId),
			new GameStatus(dto.status),
			dto.name,
			dto.requiredPlayers,
			dto.currentPlayers,
			dto.betByPlayer,
			dto.isPublic,
			dto.wasInitiated,
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
			currentPlayers: this.currentPlayers,
			requiredPlayers: this.requiredPlayers,
			wasInitiated: this.wasInitiated,
		};
	}

	/**
	 * Método que permite agregar un jugador al juego.
	 */
	addPlayer(): void {
		this.currentPlayers++;
		if (this.currentPlayers === this.requiredPlayers) this.changeStatus(GameStatusConstants.WAITING_TO_START);
	}

	/**
	 * Método que permite cambiar el estado de un juego, haciendo las
	 * respectivas validaciones.
	 * @param {GameStatusConstants} status El nuevo estado del juego.
	 * @throws {GameIsAlreadyStartedException} Si lanza si un juego ya ha sido empezado y se intenta ingresar a un juego.
	 */
	changeStatus(
		status: GameStatusConstants,
	): void {
		switch (status) {
		case GameStatusConstants.WAITING_TO_START: {
			if (!this.status.is(GameStatusConstants.WAITING_PLAYERS)) throw new GameIsAlreadyStartedException();
			break;
		}
		}
		this.status.change(status);
	}
}