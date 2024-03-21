import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserControllerConstants } from './user.controller.constants';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../session/auth.decorator';
import { UserDecorator, UserDecoratorType } from '../../session/user.decorator';
import { GetUserByIdControllerResponse, GetUserByIdResponseData } from './responses/get-user-by-id-controller.response';
import { User } from '../user';
import { UserId } from '../user-id';

/**
 * Clase que contiene los puntos de entrada a la aplicación
 * para los usuarios.
 *
 * @class
 */
@Controller(UserControllerConstants.CONTROLLER_PREFIX)
@ApiTags(UserControllerConstants.CONTROLLER_TAG)
export class UserController {

	/**
	 * @param {UserService} service Los servicios que permiten
	 * interactuar con los usuarios.
	 */
	constructor(private readonly service: UserService) {
	}

	/**
	 * Controlador GET que permite a un usuario obtener sus datos.
	 * @param {UserDecoratorType} user El usuario solicitado.
	 * @returns {GetUserByIdControllerResponse} La respuesta correspondiente al controlador.
	 */
	@Get()
	@AuthDecorator()
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiAcceptedResponse({ type: GetUserByIdControllerResponse })
	async getById(@UserDecorator() user: UserDecoratorType): Promise<GetUserByIdControllerResponse> {
		const response: GetUserByIdControllerResponse = new GetUserByIdControllerResponse();
		const data: User = await this.service.getById(new UserId(user.userId));
		response.user = new GetUserByIdResponseData(data.toDTO());
		return response;
	}
}