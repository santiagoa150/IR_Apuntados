import { PlayerService } from '../player.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerControllerConstants } from './player.controller.constants';
import { GameAuthDecorator } from '../../security/game-auth.decorator';
import { PlayerControllerResponse } from './responses/player.controller.response';
import { ExceptionResponseDTO } from '../../shared/exceptions/exception.response';
import { Player } from '../player';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { UserId } from '../../user/user-id';


import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

/**
 * El controlador de los jugadores.
 */
@Controller(PlayerControllerConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerControllerConstants.CONTROLLER_TAG)
export class PlayerController {

	/**
	 * @param userService Los servicios de los usuarios.
	 * @param playerService Los servicios de los jugadores.
	 */
	constructor(
		private readonly userService: UserService,
		private readonly playerService: PlayerService,
	) {
	}

	/**
	 * Punto de entrada GET para obtener el jugador actual de un usuario.
	 * @param {UserDecoratorType} user El usuario que consume el servicio.
	 * @returns {PlayerControllerResponse} El jugador actual.
	 */
	@Get(PlayerControllerConstants.GET_CURRENT_PLAYER_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: PlayerControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getCurrentPlayer(
		@UserDecorator() user: UserDecoratorType,
	): Promise<PlayerControllerResponse> {
		const response: PlayerControllerResponse = new PlayerControllerResponse();
		const userId: UserId = new UserId(user.userId);
		const userData: User = await this.userService.getById(userId);
		const player: Player = await this.playerService.getActiveByUserId(userId);
		response.player = await player.toDTO();
		response.currentDesignName = userData.currentDesignName;
		return response;
	}
}