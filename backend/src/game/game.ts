import { ApiProperty } from '@nestjs/swagger';
import { DomainBase } from '../shared/domain.base';
import { GameId } from './game-id';
import { UserId } from '../user/user-id';
import { GameStatus } from './game-status';
import { GameCode } from './game-code';

/**
 * Clase que representa el objeto de transferencia de un juego.
 * @class
 */
export class GameDTO {
	@ApiProperty() gameId: string;
	@ApiProperty() creatorId: string;
	@ApiProperty() status: string;
	@ApiProperty() name: string;
	@ApiProperty() code: string;
	@ApiProperty() requiredPlayers: number;
	@ApiProperty() currentPlayers: number;
	@ApiProperty() betByPlayer: number;
	@ApiProperty() isPublic: boolean;
}

/**
 * Clase que representa un juego y sus acciones disponibles.
 *
 * @class
 * @extends {DomainBase<GameDTO>}
 */
export class Game extends DomainBase<GameDTO> {

	private readonly gameId: GameId;
	private readonly creatorId: UserId;
	private readonly status: GameStatus;
	private readonly code: GameCode;
	private readonly name: string;
	private readonly requiredPlayers: number;
	private readonly currentPlayers: number;
	private readonly betByPlayer: number;
	private readonly isPublic: boolean;

	/**
	 * @param {GameId} gameId El ID del juego.
	 * @param {UserId} creatorId El ID del creador del juego.
	 * @param {GameStatus} status El estado del juego.
	 * @param {GameCode} code El código del juego.
	 * @param {string} name El nombre del juego.
	 * @param {number} requiredPlayers El total de jugadores requeridos
	 * para iniciar el juego.
	 * @param {number} currentPlayers El total de jugadores actuales.
	 * @param {number} betByPlayer El valor de apuesta por cada jugador.
	 * @param {boolean} isPublic Bandera que determina si el juego es público.
	 */
	constructor(
		gameId: GameId,
		creatorId: UserId,
		status: GameStatus,
		code: GameCode,
		name: string,
		requiredPlayers: number,
		currentPlayers: number,
		betByPlayer: number,
		isPublic: boolean,
	) {
		super();
		this.gameId = gameId;
		this.creatorId = creatorId;
		this.status = status;
		this.code = code;
		this.name = name;
		this.requiredPlayers = requiredPlayers;
		this.currentPlayers = currentPlayers;
		this.betByPlayer = betByPlayer;
		this.isPublic = isPublic;
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
			new GameCode(dto.code),
			dto.name,
			dto.requiredPlayers,
			dto.currentPlayers,
			dto.betByPlayer,
			dto.isPublic,
		);
	}

	/**
	 * Convierte el juego a su objeto de transferencia.
	 * @returns {GameDTO} El objeto de transferencia del juego.
	 */
	toDTO(): GameDTO {
		return {
			gameId: this.gameId.toString(),
			code: this.code.toString(),
			status: this.status.toString(),
			betByPlayer: this.betByPlayer,
			creatorId: this.creatorId.toString(),
			name: this.name,
			isPublic: this.isPublic,
			currentPlayers: this.currentPlayers,
			requiredPlayers: this.requiredPlayers,
		};
	}
}