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

	private readonly playerId: PlayerId;
	private readonly gameId: GameId;
	private readonly userId: UserId;
	private readonly status: PlayerStatus;
	private readonly trips1?: Trips;
	private readonly trips2?: Trips;
	private readonly quads?: Quads;
	private readonly score?: number;
	private readonly position?: number;
	private readonly kicker?: Card;

	/**
	 * @param {PlayerId} playerId El id del jugador.
	 * @param {GameId} gameId El id del juego.
	 * @param {UserId} userId El id del usuario.
	 * @param {PlayerStatus} status El estado del jugador.
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
		this.status = status;
		this.trips1 = trips1;
		this.trips2 = trips2;
		this.quads = quads;
		this.score = score;
		this.position = position;
		this.kicker = kicker;
	}

	/**
	 * Convierte el objeto de transferencia de un jugador al modelo de dominio.
	 * @param {PlayerDTO} dto El objeto de transferencia.
	 * @returns {Promise<Player>} El jugador.
	 * @static
	 * @async
	 */
	static async fromDto(dto: PlayerDTO): Promise<Player> {
		const trips1: Trips = Array.isArray(dto.trips1) ?
			await Promise.all(dto.trips1.map(async (t) => Card.fromDto(t))) as Trips : undefined;

		const trips2: Trips = Array.isArray(dto.trips2) ?
			await Promise.all(dto.trips2.map(async (t) => Card.fromDto(t))) as Trips : undefined;

		const quads: Quads = Array.isArray(dto.quads) ?
			await Promise.all(dto.quads.map(async (q) => Card.fromDto(q))) as Quads : undefined;
		return new Player(
			new PlayerId(dto.playerId),
			new GameId(dto.gameId),
			new UserId(dto.userId),
			new PlayerStatus(dto.status),
			trips1,
			trips2,
			quads,
			dto.score,
			dto.position,
			dto.kicker ? Card.fromDto(dto.kicker) : undefined,
		);
	}

	/**
	 * Convierte el jugador al objeto de transferencia.
	 * @returns {PlayerDTO} El objeto de transferencia.
	 * @async
	 */
	async toDTO(): Promise<PlayerDTO> {
		const trips1: TripsDTO = Array.isArray(this.trips1) ?
			await Promise.all(this.trips1.map(async (t) => t.toDTO())) as TripsDTO : undefined;

		const trips2: TripsDTO = Array.isArray(this.trips2) ?
			await Promise.all(this.trips2.map(async (t) => t.toDTO())) as TripsDTO : undefined;

		const quads: QuadsDTO = Array.isArray(this.quads) ?
			await Promise.all(this.quads.map(async (q) => q.toDTO())) as QuadsDTO : undefined;
		return {
			gameId: this.gameId.toString(),
			kicker: this.kicker?.toDTO(),
			playerId: this.playerId.toString(),
			position: this.position,
			quads,
			score: this.score,
			status: this.status.toString(),
			trips1,
			trips2,
			userId: this.userId.toString(),
		};
	}
}