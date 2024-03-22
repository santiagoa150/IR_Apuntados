import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserControllerConstants } from './user.controller.constants';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../session/auth.decorator';
import { UserDecorator, UserDecoratorType } from '../../session/user.decorator';
import { GetUserByIdControllerResponse, GetUserByIdResponseData } from './responses/get-user-by-id-controller.response';
import { User } from '../user';
import { UserId } from '../user-id';
import { ExceptionResponseDTO } from '../../shared/exception.response';
import { CreateUserControllerRequest } from './requests/create-user.controller.request';
import { SessionService } from '../../session/session.service';
import { CreateUserControllerResponse } from './responses/create-user.controller.response';

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
	 * @param {UserService} service Los servicios que permiten interactuar con los usuarios.
	 * @param {SessionService} sessionService Los servicios que permiten interactuar con la sesión del usuario.
	 */
	constructor(
		private readonly service: UserService,
		private readonly sessionService: SessionService,
	) {
	}

	/**
	 * Controlador POST que permite crear un usuario.
	 * @param {CreateUserControllerRequest} body Datos requeridos para crear el usuario.
	 * @returns {CreateUserControllerResponse} La información de acceso a la aplicación.
	 */
	@Post()
	@ApiCreatedResponse({ type: CreateUserControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async create(@Body() body: CreateUserControllerRequest): Promise<CreateUserControllerResponse> {
		const response: CreateUserControllerResponse = new CreateUserControllerResponse();
		const user: User = await this.service.create(body.username, body.password);
		response.accessToken = this.sessionService.generateAccessToken(user.userId);
		response.refreshToken = this.sessionService.generateRefreshToken(user.userId);
		return response;
	}

	/**
	 * Controlador GET que permite a un usuario obtener sus datos.
	 * @param {UserDecoratorType} user El usuario solicitado.
	 * @returns {GetUserByIdControllerResponse} La respuesta correspondiente al controlador.
	 */
	@Get()
	@AuthDecorator()
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiOkResponse({ type: GetUserByIdControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getById(@UserDecorator() user: UserDecoratorType): Promise<GetUserByIdControllerResponse> {
		const response: GetUserByIdControllerResponse = new GetUserByIdControllerResponse();
		const data: User = await this.service.getById(new UserId(user.userId));
		response.user = new GetUserByIdResponseData(data.toDTO());
		return response;
	}
}