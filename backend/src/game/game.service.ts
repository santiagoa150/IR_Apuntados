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
import { GameIsAlreadyStartedException } from './exceptions/game-is-already-started.exception';
import { GameExceedsItsPlayerCountException } from './exceptions/game-exceeds-its-player-count.exception';
import { GameNotUpdatedException } from './exceptions/game-not-updated.exception';
import { EventBus } from '@nestjs/cqrs';
import { PlayerJoinGameEvent } from './events/player/player-join-game/player-join-game.event';
import { GameReadyToStartEvent } from './events/game-ready-to-start/game-ready-to-start.event';

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
	 * @param {EventBus} eventBus Bus de CQRS para enviar eventos.
	 * @param {Model<GameDocument>} model Modelo para interactuar con la base de
	 * datos de los juegos.
	 */
	constructor(
		private readonly userService: UserService,
		private readonly playerService: PlayerService,
		private readonly eventBus: EventBus,
		@Inject(DatabaseConstants.GAME_PROVIDER) private readonly model: Model<GameDocument>,
	) {
	}

	/**
	 * Función que permite crear un juego.
	 * @param request Datos requeridos para crear un juego.
	 * @param {UserId} request.creatorId El creador del juego.
	 * @param {number} request.requiredPlayers La cantidad de jugadores requeridos para iniciar
	 * el juego.
	 * @param {boolean} request.isPublic Bandera que determina si el juego es público o no.
	 * @param {number} request.betByPlayer La cantidad de tokens que debe apostar cada jugador.
	 * @param {string} request.name El nombre del juego.
	 * @throws {InvalidGameRequiredPlayersException} Se lanza si el valor del parámetro "requiredPlayers"
	 * no cumple con las características requeridas por el sistema.
	 * @returns {Promise<Game>} El juego generado.
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
		const game: Game = Game.fromDTO({
			creatorId: request.creatorId.toString(),
			hostId: request.creatorId.toString(),
			gameId: GameId.create(),
			status: GameStatusConstants.WAITING_PLAYERS,
			requiredPlayers: requiredPlayers,
			currentPlayers: 1,
			betByPlayer: request.betByPlayer,
			isPublic: request.isPublic,
			name: request.name,
			wasInitiated: false,
		});
		await new this.model(game.toDTO()).save();
		await this.playerService.create(request.creatorId, game.gameId, false);
		await this.userService.update(user);
		this.logger.log(`[${this.create.name}] FINISH ::`);
		return game;
	}

	/**
	 * Función que permite buscar un juego por su ID y validar su existencia
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
		const mapped: Game = found ? Game.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new GameNotFoundException();
		this.logger.log(`[${this.getById.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Función que permite buscar un juego mediante un jugador.
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
	 * Función que permite traer todos los juegos públicos.
	 * @returns {Array<Game>} Todos los juegos públicos disponibles.
	 */
	async getPublicAndEmpty(): Promise<Array<Game>> {
		this.logger.log(`[${this.getPublicAndEmpty.name}] INIT ::`);
		// TODO: Mejorar la lógica de este método con paginación.
		const found: Array<GameDTO> = await this.model.find({
			isPublic: true,
			status: GameStatusConstants.WAITING_PLAYERS,
		});
		const mapped: Array<Game> = await Promise.all(found.map(async (g) => Game.fromDTO(g)));
		this.logger.log(`[${this.getPublicAndEmpty.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Función que permite a un usuario ingresar a un juego.
	 * @param {GameId} gameId El juego al que se va a ingresar.
	 * @param {UserId} userId El usuario que desea ingresar.
	 * @returns {Game} El juego al que se ingresó.
	 * @throws {GameIsAlreadyStartedException} Se lanza cuando se intenta ingresar a un juego que ya
	 * ha iniciado.
	 * @throws {GameExceedsItsPlayerCountException} Se lanza cuando el juego no se ha iniciado,
	 * pero ya está lleno.
	 */
	async join(gameId: GameId, userId: UserId): Promise<Game> {
		this.logger.log(`[${this.join.name}] INIT :: gameId: ${gameId.toString()}, userId: ${userId.toString()}`);
		const game: Game = await this.getById(gameId);
		if (game.wasInitiated) throw new GameIsAlreadyStartedException();
		if (game.status.is(GameStatusConstants.WAITING_TO_START)) throw new GameExceedsItsPlayerCountException();
		const user: User = await this.userService.getById(userId);
		user.changeStatus(UserStatusConstants.PLAYING);
		user.removeTokens(game.betByPlayer);
		const player: Player = await this.playerService.create(userId, gameId, false);
		await this.userService.update(user);
		game.addPlayer();
		const updated: Game = await this.update(game);
		this.eventBus.publish(new PlayerJoinGameEvent(user, player, game));
		this.eventBus.publish(new GameReadyToStartEvent(game));
		this.logger.log(`[${this.join.name}] FINISH ::`);
		return updated;
	}

	/**
	 * Función que permite actualizar toda la información de un juego.
	 * @param {Game} game El juego que se está actualizando.
	 * @returns {Promise<Game>} El juego actualizado.
	 * @throws {GameNotUpdatedException} Se lanza cuando la solicitud de actualización
	 * no se pudo realizar.
	 */
	async update(game: Game): Promise<Game> {
		this.logger.log(`[${this.update.name}] INIT ::`);
		const updated: GameDTO = await this.model.findOneAndUpdate(
			{ gameId: game.gameId.toString() },
			game.toDTO(),
			{ new: true },
		);
		const mapped: Game = updated ? Game.fromDTO(updated) : undefined;
		if (!mapped) throw new GameNotUpdatedException();
		this.logger.log(`[${this.update.name}] FINISH ::`);
		return mapped;
	}
}