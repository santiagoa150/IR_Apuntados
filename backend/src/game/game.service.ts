import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { GameDocument } from '../database/game.schema';
import { Game } from './game';
import { UserId } from '../user/user-id';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { UserStatusConstants } from '../user/user-status.constants';
import { InvalidGameRequiredPlayersException } from './exceptions/invalid-game-required-players.exception';
import { GameId } from './game-id';
import { GameStatusConstants } from './game-status.constants';

/**
 * Clase que contiene los servicios para interactuar con los
 * juegos del sistema.
 * @class
 */
@Injectable()
export class GameService {

	private readonly logger: Logger = new Logger(GameService.name);

	/**
	 * @param {UserService} userService Servicios para interactuar con los usuarios.
	 * @param {Model<GameDocument>} model Modelo para interactuar con la base de
	 * datos de los juegos.
	 */
	constructor(
		private readonly userService: UserService,
		@Inject(DatabaseConstants.GAME_PROVIDER) private readonly model: Model<GameDocument>,
	) {
	}

	async create(
		request: {
			creatorId: UserId,
			requiredPlayers: number,
			isPublic: boolean,
			betByPlayer: number,
			name: string,
		},
	): Promise<Game> {
		this.logger.log(`[${this.create.name}] INIT :: request: ${JSON.stringify(request)}`);
		const { requiredPlayers } = request;
		const user: User = await this.userService.getById(request.creatorId);
		user.changeStatus(UserStatusConstants.PLAYING);
		user.removeTokens(request.betByPlayer);
		if (requiredPlayers < 2 || requiredPlayers > 6) throw new InvalidGameRequiredPlayersException();
		const game: Game = Game.fromDto({
			creatorId: request.creatorId.toString(),
			gameId: GameId.create(),
			status: GameStatusConstants.WAITING_PLAYERS,
			requiredPlayers: requiredPlayers,
			currentPlayers: 1,
			betByPlayer: request.betByPlayer,
			isPublic: request.isPublic,
			name: request.name,
		});
		await new this.model(game.toDTO()).save();
		// TODO: Crear jugador
		await this.userService.update(user);
		this.logger.log(`[${this.create.name}] FINISH ::`);
		return game;
	}
}