import { GameService } from '../game.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameControllerConstants } from './game.controller.constants';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../security/auth.decorator';
import { ExceptionResponseDTO } from '../../shared/exception.response';
import { CreateGameControllerResponse } from './responses/create-game.controller.response';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { CreateGameControllerRequest } from './requests/create-game.controller.request';
import { Game, GameDTO } from '../game';
import { UserId } from '../../user/user-id';
import { GetPublicGamesControllerResponse } from './responses/get-public-games.controller.response';
import { GetCurrentGameControllerResponse } from './responses/get-current-game.controller.response';
import { GameAuthDecorator } from '../../security/game-auth.decorator';
import { GameDecorator } from '../../security/game.decorator';

/**
 * Clase que contiene los puntos de entrada a la aplicación
 * para los usuarios.
 * @class
 */
@Controller(GameControllerConstants.CONTROLLER_PREFIX)
@ApiTags(GameControllerConstants.CONTROLLER_TAG)
export class GameController {

	/**
	 * @param {GameService} service Los servicios que permiten interactuar con los juegos.
	 */
	constructor(
		private readonly service: GameService,
	) {
	}

	/**
	 * Controlador POST que permite crear un juego.
	 * @param {CreateGameControllerRequest} body Los datos requeridos para crear el juego.
	 * @param {UserDecoratorType} user El usuario que crea el juego.
	 * @returns {CreateGameControllerResponse} La respuesta con el juego creado.
	 */
	@Post()
	@AuthDecorator()
	@ApiCreatedResponse({ type: CreateGameControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async create(
		@Body() body: CreateGameControllerRequest,
		@UserDecorator() user: UserDecoratorType,
	): Promise<CreateGameControllerResponse> {
		const response: CreateGameControllerResponse = new CreateGameControllerResponse();
		const data: Game = await this.service.create({
			creatorId: new UserId(user.userId), ...body,
		});
		response.data = data.toDTO();
		return response;
	}

	/**
	 * Método GET que permite traer el juego actual de un jugador.
	 * @param {GameDTO} game El juego solicitado.
	 * @returns {GetPublicGamesControllerResponse} La respuesta del controlador
	 * con el juego solicitado.
	 */
	@Get(GameControllerConstants.GET_CURRENT_GAME_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: GetCurrentGameControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getCurrentDetail(@GameDecorator() game: GameDTO): Promise<GetCurrentGameControllerResponse> {
		const response: GetCurrentGameControllerResponse = new GetCurrentGameControllerResponse();
		response.game = game;
		return response;
	}

	/**
	 * Método GET que permite traer todos los juegos públicos y disponibles.
	 * @returns {GetPublicGamesControllerResponse} La respuesta que contiene los juegos públicos
	 * disponibles.
	 */
	@Get(GameControllerConstants.GET_PUBLIC_GAMES_URL)
	@AuthDecorator()
	@ApiOkResponse({ type: GetPublicGamesControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getPublic(): Promise<GetPublicGamesControllerResponse> {
		const response: GetPublicGamesControllerResponse = new GetPublicGamesControllerResponse();
		const games: Array<Game> = await this.service.getPublicAndUninitiated();
		response.data = await Promise.all(games.map(async (g) => g.toDTO()));
		return response;
	}
}