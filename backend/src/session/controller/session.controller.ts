import { Controller, Post, UseGuards } from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginControllerRequest } from './requests/login-controller.request';
import { LoginControllerResponse } from './responses/login-controller.response';
import { ExceptionResponseDTO } from '../../shared/exception.response';
import { SessionControllerConstants } from './session.controller.constants';
import { SessionService } from '../session.service';
import { UserDecorator } from '../user.decorator';
import { UserDTO } from '../../user/user';
import { UserId } from '../../user/user-id';

/**
 * Clase que contiene los puntos de entrada a la aplicación
 * para las sesiones.
 *
 * @class
 */
@Controller(SessionControllerConstants.CONTROLLER_PREFIX)
@ApiTags(SessionControllerConstants.CONTROLLER_TAG)
export class SessionController {

	/**
	 * @param {SessionService} service Los servicios que permiten
	 * interactuar con la sesión de la aplicación.
	 */
	constructor(private readonly service: SessionService) {
	}

	/**
	 * Controlador POST que permite a un usuario iniciar sesión.
	 * @param {UserDTO} user Los datos del usuario después del inicio de sesión.
	 * @returns {LoginControllerResponse} La respuesta correspondiente al inicio
	 * de sesión.
	 */
	@Post(SessionControllerConstants.LOGIN_URL)
	@UseGuards(LoginGuard)
	@ApiBody({ type: LoginControllerRequest })
	@ApiOkResponse({ type: LoginControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async login(@UserDecorator() user: UserDTO): Promise<LoginControllerResponse> {
		const response: LoginControllerResponse = new LoginControllerResponse();
		const userId: UserId = new UserId(user.userId);
		response.accessToken = this.service.generateAccessToken(userId);
		response.refreshToken = this.service.generateRefreshToken(userId);
		return response;
	}
}