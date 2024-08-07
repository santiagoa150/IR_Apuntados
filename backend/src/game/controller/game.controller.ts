import { GameService } from '../game.service';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { GameControllerConstants } from './game.controller.constants';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../security/auth.decorator';
import { ExceptionResponseDTO } from '../../shared/exceptions/exception.response';
import { GameControllerResponse } from './responses/game.controller.response';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { CreateGameControllerRequest } from './requests/create-game.controller.request';
import { Game, GameDTO } from '../game';
import { UserId } from '../../user/user-id';
import { GetPublicGamesControllerResponse } from './responses/get-public-games.controller.response';
import { GetCurrentGameControllerResponse } from './responses/get-current-game.controller.response';
import { GameAuthDecorator } from '../../security/game-auth.decorator';
import { GameDecorator } from '../../security/game.decorator';
import { PlayerService } from '../../player/player.service';
import { GameId } from '../game-id';
import { JoinGameControllerRequest } from './requests/join-game-controller.request';
import { GameStatusConstants } from '../game-status.constants';
import { MatchService } from '../../match/match.service';
import { MatchId } from '../../match/match-id';
import { Match } from '../../match/match';

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
	 * @param {PlayerService} playerService Los servicios que permiten interactuar con los jugadores.
	 * @param {MatchService} matchService Los servicios que permiten interactuar con las partidas.
	 */
	constructor(
		private readonly service: GameService,
		private readonly playerService: PlayerService,
		private readonly matchService: MatchService,
	) {
	}

	/**
	 * Controlador POST que permite crear un juego.
	 * @param {CreateGameControllerRequest} body Los datos requeridos para crear el juego.
	 * @param {UserDecoratorType} user El usuario que crea el juego.
	 * @returns {GameControllerResponse} La respuesta con el juego creado.
	 */
	@Post()
	@AuthDecorator()
	@ApiCreatedResponse({ type: GameControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async create(
		@Body() body: CreateGameControllerRequest,
		@UserDecorator() user: UserDecoratorType,
	): Promise<GameControllerResponse> {
		const response: GameControllerResponse = new GameControllerResponse();
		const data: Game = await this.service.create({
			creatorId: new UserId(user.userId), ...body,
		});
		response.data = data.toDTO();
		return response;
	}

	/**
	 * Método GET que permite traer el juego actual de un jugador.
	 * @param {UserDTO} user Los datos de autenticación del usuario.
	 * @param {GameDTO} game El juego solicitado.
	 * @returns {GetPublicGamesControllerResponse} La respuesta del controlador
	 * con el juego solicitado.
	 */
	@Get(GameControllerConstants.GET_CURRENT_GAME_DETAIL_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: GetCurrentGameControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getCurrentGameDetail(
		@UserDecorator() user: UserDecoratorType,
		@GameDecorator() game: GameDTO,
	): Promise<GetCurrentGameControllerResponse> {
		const response: GetCurrentGameControllerResponse = new GetCurrentGameControllerResponse();
		response.game = game;
		response.players = await this.playerService.getWithUserByGame(
			new GameId(game.gameId),
			new UserId(user.userId),
		);
		if (game.status === GameStatusConstants.ACTIVE) {
			const match: Match = await this.matchService.getById(new MatchId(game.currentMatch));
			response.discardedCards = await match.discardedCards.toDTO();
		}
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
		const games: Array<Game> = await this.service.getPublicAndEmpty();
		response.data = await Promise.all(games.map(async (g) => g.toDTO()));
		return response;
	}

	/**
	 * Método PATCH que permite que un jugador ingrese a un juego.
	 * @param {JoinGameControllerRequest} body Los datos requeridos para ingresar a un juego.
	 * @param {UserDecoratorType} user El usuario que ingresa al juego.
	 * @returns {GameControllerConstants} La respuesta del controlador con el juego al que se ingresó.
	 */
	@Patch(GameControllerConstants.JOIN_GAME_URL)
	@AuthDecorator()
	@ApiOkResponse({ type: GameControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async join(
		@Body() body: JoinGameControllerRequest,
		@UserDecorator() user: UserDecoratorType,
	): Promise<GameControllerResponse> {
		const response: GameControllerResponse = new GameControllerResponse();
		const data: Game = await this.service.join(new GameId(body.gameId), new UserId(user.userId));
		response.data = data.toDTO();
		return response;
	}
}