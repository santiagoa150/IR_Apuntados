import { MatchService } from '../match.service';
import { Controller, Post } from '@nestjs/common';
import { GameAuthDecorator } from '../../security/game-auth.decorator';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionResponseDTO } from '../../shared/exceptions/exception.response';
import { MatchControllerConstants } from './match.controller.constants';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { GameDecorator } from '../../security/game.decorator';
import { Game, GameDTO } from '../../game/game';
import { UserId } from '../../user/user-id';
import { DefaultResponse } from '../../shared/default.response';

/**
 * Clase que contiene los puntos de entrada de la aplicación para las partidas.
 */
@Controller(MatchControllerConstants.CONTROLLER_PREFIX)
@ApiTags(MatchControllerConstants.CONTROLLER_TAG)
export class MatchController {

	/**
	 * @param service Los servicios de la partida.
	 */
	constructor(
		private readonly service: MatchService,
	) {
	}

	/**
	 * Controlador POST que inicia una partida.
	 * @param {UserDecoratorType} user El usuario que está iniciando la partida.
	 * @param {GameDTO} game El juego al que pertenece la partida.
	 * @returns {DefaultResponse} La respuesta del servicio.
	 */
	@Post()
	@GameAuthDecorator()
	@ApiCreatedResponse({ type: DefaultResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async start(
		@UserDecorator() user: UserDecoratorType,
		@GameDecorator() game: GameDTO,
	): Promise<DefaultResponse> {
		const response: DefaultResponse = new DefaultResponse();
		await this.service.startByPlayer(new UserId(user.userId), Game.fromDTO(game));
		return response;
	}
}