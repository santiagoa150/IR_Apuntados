import { DomainBase } from '../shared/domain.base';
import { ApiProperty } from '@nestjs/swagger';
import { Trips, TripsDTO } from '../card/trips';
import { Quads, QuadsDTO } from '../card/quads';
import { Card, CardDTO } from '../card/card';
import { PlayerId } from './player-id';
import { GameId } from '../game/game-id';
import { UserId } from '../user/user-id';
import { PlayerStatus } from './player-status';

/**
 * Clase que representa el objeto de transferencia de un jugador.
 * @class
 */
export class PlayerDTO {
	@ApiProperty() playerId: string;
	@ApiProperty() gameId: string;
	@ApiProperty() userId: string;
	@ApiProperty() status: string;
	@ApiProperty() isActive: boolean;
	@ApiProperty() trips1?: TripsDTO;
	@ApiProperty() trips2?: TripsDTO;
	@ApiProperty() quads?: QuadsDTO;
	@ApiProperty() score?: number;
	@ApiProperty() position?: number;
	@ApiProperty() kicker?: CardDTO;
}

/**
 * Clase que representa un jugador y sus acciones disponibles.
 * @class
 * @extends {DomainBase<PlayerDTO>}
 */
export class Player extends DomainBase<PlayerDTO> {

	public readonly gameId: GameId;
	private readonly playerId: PlayerId;
	private readonly userId: UserId;
	private readonly isActive: boolean;

	/**
	 * @param {PlayerId} playerId El id del jugador.
	 * @param {GameId} gameId El id del juego.
	 * @param {UserId} userId El id del usuario.
	 * @param {PlayerStatus} status El estado del jugador.
	 * @param {boolean} isActive Bandera que determina si un jugador está activo.
	 * @param {number} score La puntuación del jugador en una partida.
	 * @param {number} position La posición de un jugador en una partida.
	 * @param {Trips} trips1 La terna 1 del jugador.
	 * @param {Trips} trips2 La terna 2 del jugador.
	 * @param {Quads} quads La cuarta del jugador.
	 * @param {Card} kicker La sobrante del jugador.
	 */
	constructor(
		playerId: PlayerId,
		gameId: GameId,
		userId: UserId,
		status: PlayerStatus,
		isActive: boolean,
		trips1?: Trips,
		trips2?: Trips,
		quads?: Quads,
		score?: number,
		position?: number,
		kicker?: Card,
	) {
		super();
		this.playerId = playerId;
		this.gameId = gameId;
		this.userId = userId;
		this._status = status;
		this.isActive = isActive;
		this._trips1 = trips1;
		this._trips2 = trips2;
		this._quads = quads;
		this._score = score;
		this._position = position;
		this._kicker = kicker;
	}

	private _trips1?: Trips;

	set trips1(value: Trips) {
		this._trips1 = value;
	}

	private _trips2?: Trips;

	set trips2(value: Trips) {
		this._trips2 = value;
	}

	private _quads?: Quads;

	set quads(value: Quads) {
		this._quads = value;
	}

	private _score?: number;

	set score(value: number) {
		this._score = value;
	}

	private _kicker?: Card;

	set kicker(value: Card) {
		this._kicker = value;
	}

	private _status: PlayerStatus;

	set status(value: PlayerStatus) {
		this._status = value;
	}

	private _position?: number;

	set position(value: number) {
		this._position = value;
	}

	/**
	 * Convierte el objeto de transferencia de un jugador al modelo de dominio.
	 * @param {PlayerDTO} dto El objeto de transferencia.
	 * @returns {Promise<Player>} El jugador.
	 * @static
	 * @async
	 */
	static async fromDTO(dto: PlayerDTO): Promise<Player> {
		const trips1: Trips = Array.isArray(dto.trips1) ?
			await Promise.all(dto.trips1.map(async (t) => Card.fromDTO(t))) as Trips : undefined;

		const trips2: Trips = Array.isArray(dto.trips2) ?
			await Promise.all(dto.trips2.map(async (t) => Card.fromDTO(t))) as Trips : undefined;

		const quads: Quads = Array.isArray(dto.quads) ?
			await Promise.all(dto.quads.map(async (q) => Card.fromDTO(q))) as Quads : undefined;

		return new Player(
			new PlayerId(dto.playerId),
			new GameId(dto.gameId),
			new UserId(dto.userId),
			new PlayerStatus(dto.status),
			dto.isActive,
			trips1,
			trips2,
			quads,
			dto.score,
			dto.position,
			dto.kicker ? Card.fromDTO(dto.kicker) : undefined,
		);
	}

	/**
	 * Convierte el jugador al objeto de transferencia.
	 * @returns {PlayerDTO} El objeto de transferencia.
	 * @async
	 */
	public async toDTO(): Promise<PlayerDTO> {
		const trips1: TripsDTO = Array.isArray(this._trips1) ?
			await Promise.all(this._trips1.map(async (t) => t.toDTO())) as TripsDTO : undefined;

		const trips2: TripsDTO = Array.isArray(this._trips2) ?
			await Promise.all(this._trips2.map(async (t) => t.toDTO())) as TripsDTO : undefined;

		const quads: QuadsDTO = Array.isArray(this._quads) ?
			await Promise.all(this._quads.map(async (q) => q.toDTO())) as QuadsDTO : undefined;

		return {
			gameId: this.gameId.toString(),
			isActive: this.isActive,
			kicker: this._kicker?.toDTO(),
			playerId: this.playerId.toString(),
			position: this._position,
			quads,
			score: this._score,
			status: this._status.toString(),
			trips1,
			trips2,
			userId: this.userId.toString(),
		};
	}
}