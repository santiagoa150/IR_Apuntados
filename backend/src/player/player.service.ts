import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { PlayerDocument } from '../database/player.schema';
import { Player, PlayerDTO } from './player';
import { UserId } from '../user/user-id';
import { GameId } from '../game/game-id';
import { UserService } from '../user/user.service';
import { UserIsAlreadyPlayingException } from '../user/exceptions/user-is-already-playing.exception';
import { PlayerNotFoundException } from './exceptions/player-not-found.exception';
import { PlayerId } from './player-id';
import { PlayerStatusConstants } from './player-status.constants';

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
	 * @param {UserId} userId
	 * @param gameId
	 * @param validateUser
	 */
	async create(userId: UserId, gameId: GameId, validateUser: boolean = true): Promise<Player> {
		this.logger.log(`[${this.create.name}] INIT :: userId: ${userId.toString()}, gameId: ${gameId.toString()}`);
		if (
			validateUser &&
			(await this.getByUserId(userId, false))
		) throw new UserIsAlreadyPlayingException();
		const player: Player = await Player.fromDto({
			gameId: gameId.toString(),
			playerId: PlayerId.create(),
			status: PlayerStatusConstants.WAITING_GAME,
			userId: userId.toString(),
		});
		await new this.model(player).save();
		this.logger.log(`[${this.create.name}] FINISH ::`);
		return player;
	}

	/**
	 * Método que permite buscar un jugador por su userId y validar su existencia.
	 * @param {UserId} userId El usuario que se solicita.
	 * @param {boolean} [throwExceptionIfNotFound=true] Bandera para determinar si se debe lanzar
	 * una excepción cuando el jugador solicitado no existe.
	 * @returns {Promise<Player | undefined>} Se retorna el jugador solicitado cuando se encuentra,
	 * si la bandera throwExceptionIfNotFound=false y el jugador solicitado no existe se retorna undefined.
	 * @throws {PlayerNotFoundException} Se lanza cuando la bandera throwExceptionIfNotFound=true y el jugador solicitado
	 * no existe.
	 */
	async getByUserId(userId: UserId, throwExceptionIfNotFound: boolean = true): Promise<Player | undefined> {
		this.logger.log(`[${this.getByUserId.name}] INIT :: userId: ${userId.toString()}`);
		const found: PlayerDTO = await this.model.findOne({ userId: userId.toString() });
		const mapped: Player = found ? await Player.fromDto(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new PlayerNotFoundException();
		this.logger.log(`[${this.getByUserId.name}] FINISH ::`);
		return mapped;
	}
}