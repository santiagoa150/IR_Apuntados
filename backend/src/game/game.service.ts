import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { GameDocument } from '../database/game.schema';
import { Game, GameDTO } from './game';
import { UserId } from '../user/user-id';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { UserStatusConstants } from '../user/user-status.constants';
import { InvalidGameRequiredPlayersException } from './exceptions/invalid-game-required-players.exception';
import { GameId } from './game-id';
import { GameStatusConstants } from './game-status.constants';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player';
import { GameIsAlreadyFinishedException } from './exceptions/game-is-already-finished.exception';
import { GameNotFoundException } from './exceptions/game-not-found.exception';

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
	 * @param {PlayerService} playerService Servicios para interactuar con los jugadores.
	 * @param {Model<GameDocument>} model Modelo para interactuar con la base de
	 * datos de los juegos.
	 */
	constructor(
		private readonly userService: UserService,
		private readonly playerService: PlayerService,
		@Inject(DatabaseConstants.GAME_PROVIDER) private readonly model: Model<GameDocument>,
	) {
	}

	/**
	 * Método que permite crear un juego.
	 * @param request Datos requeridos para crear un juego.
	 * @param {UserId} request.creatorId El creador del juego.
	 * @param {number} request.requiredPlayers La cantidad de jugadores requeridos para iniciar
	 * el juego.
	 * @param {boolean} request.isPublic Bandera que determina si el juego es público o no.
	 * @param {number} request.betByPlayer La cantidad de tokens que debe apostar cada jugador.
	 * @param {string} request.name El nombre del juego.
	 * @throws {InvalidGameRequiredPlayersException} Se lanza si el valor del parámetro "requiredPlayers"
	 * no cumple con las características requeridas por el sistema.
	 * @returns {Promise<Game>} El juego creado.
	 */
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
		await this.playerService.create(request.creatorId, game.gameId, false);
		await this.userService.update(user);
		this.logger.log(`[${this.create.name}] FINISH ::`);
		return game;
	}

	/**
	 * Método que permite buscar un juego por su ID y validar su existencia
	 * @param {GameId} gameId El juego que se solicita.
	 * @param {boolean} [throwExceptionIfNotFound=true] Bandera para determinar si se debe lanzar
	 * una excepción cuando el juego solicitado no existe.
	 * @returns {Promise<Player | undefined>} Se retorna el juego solicitado cuando se encuentra,
	 * si la bandera throwExceptionIfNotFound=false y el juego solicitado no existe se retorna undefined.
	 * @throws {GameNotFoundException} Se lanza cuando la bandera throwExceptionIfNotFound=true
	 * y el juego solicitado no existe.
	 */
	async getById(gameId: GameId, throwExceptionIfNotFound: boolean = true): Promise<Game | undefined> {
		this.logger.log(`[${this.getById.name}] INIT :: gameId: ${gameId.toString()}`);
		const found: GameDTO = await this.model.findOne({ gameId: gameId.toString() });
		const mapped: Game = found ? Game.fromDto(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new GameNotFoundException();
		this.logger.log(`[${this.getById.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Método que permite buscar un juego mediante un jugador.
	 * @param {UserId} userId El usuario que corresponde al jugador.
	 * @returns {Promise<Game>} El juego encontrado.
	 */
	async getNotFinishedByPlayer(userId: UserId): Promise<Game> {
		this.logger.log(`[${this.getNotFinishedByPlayer.name}] INIT :: userId: ${userId.toString()}`);
		const player: Player = await this.playerService.getActiveByUserId(userId);
		const game: Game = await this.getById(player.gameId);
		if (game.status.is(GameStatusConstants.FINISHED)) throw new GameIsAlreadyFinishedException();
		this.logger.log(`[${this.getNotFinishedByPlayer.name}] FINISH ::`);
		return game;
	}

	/**
	 * Método que permite traer todos los juegos públicos.
	 * @returns {Array<Game>} Todos los juegos públicos disponibles.
	 */
	async getPublicAndUninitiated(): Promise<Array<Game>> {
		this.logger.log(`[${this.getPublicAndUninitiated.name}] INIT ::`);
		// TODO: Mejorar la lógica de este método con paginación.
		const found: Array<GameDTO> = await this.model.find({
			isPublic: true,
			status: GameStatusConstants.WAITING_PLAYERS,
		});
		const mapped: Array<Game> = await Promise.all(found.map(async (g) => Game.fromDto(g)));
		this.logger.log(`[${this.getPublicAndUninitiated.name}] FINISH ::`);
		return mapped;
	}
}