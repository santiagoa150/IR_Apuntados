import { GameService } from '../game.service';
import { Body, Controller, Post } from '@nestjs/common';
import { GameControllerConstants } from './game.controller.constants';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../session/auth.decorator';
import { ExceptionResponseDTO } from '../../shared/exception.response';
import { CreateGameControllerResponse } from './responses/create-game.controller.response';
import { UserDecorator, UserDecoratorType } from '../../session/user.decorator';
import { CreateGameControllerRequest } from './requests/create-game.controller.request';
import { Game } from '../game';
import { UserId } from '../../user/user-id';

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
}