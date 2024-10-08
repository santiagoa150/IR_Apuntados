import { Body, ClassSerializerInterceptor, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserControllerConstants } from './user.controller.constants';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../security/auth.decorator';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { GetUserControllerResponse, GetUserResponseData } from './responses/get-user-controller.response';
import { User } from '../user';
import { UserId } from '../user-id';
import { ExceptionResponseDTO } from '../../shared/exceptions/exception.response';
import { CreateUserControllerRequest } from './requests/create-user.controller.request';
import { SessionService } from '../../security/session.service';
import { CreateUserControllerResponse } from './responses/create-user.controller.response';
import { UpdateUserCardDesignControllerRequest } from './requests/update-user-card-design.controller.request';
import { CardDesignId } from '../../card-design/card-design-id';
import { DefaultResponse } from '../../shared/default.response';
import { UpdateUserIconController } from './requests/update-user-icon.controller.request';
import { UserIcon } from '../user-icon';
import { CardDesignService } from '../../card-design/card-design.service';
import { CardDesign } from '../../card-design/card-design';

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
	 * @param {CardDesignService} cardDesignService Los servicios que permiten actualizar con los diseños de cartas del usuario.
	 */
	constructor(
		private readonly service: UserService,
		private readonly sessionService: SessionService,
		private readonly cardDesignService: CardDesignService,
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
		const defaultDesign: CardDesign = await this.cardDesignService.getDefault();
		const user: User = await this.service.create(body.username, body.password, defaultDesign);
		response.accessToken = this.sessionService.generateAccessToken(user.userId);
		response.refreshToken = this.sessionService.generateRefreshToken(user.userId);
		response.userId = user.userId.toString();
		return response;
	}

	/**
	 * Controlador GET que permite a un usuario obtener sus datos.
	 * @param {UserDecoratorType} user El usuario solicitado.
	 * @returns {GetUserControllerResponse} La respuesta correspondiente al controlador.
	 */
	@Get(UserControllerConstants.GET_ME_URL)
	@AuthDecorator()
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiOkResponse({ type: GetUserControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getById(@UserDecorator() user: UserDecoratorType): Promise<GetUserControllerResponse> {
		const response: GetUserControllerResponse = new GetUserControllerResponse();
		const data: User = await this.service.getById(new UserId(user.userId));
		response.user = new GetUserResponseData(data.toDTO());
		return response;
	}

	/**
	 * Controlador PATCH que permite actualizar el diseño de carta
	 * de un usuario.
	 * @param {UpdateUserCardDesignControllerRequest} body El diseño de carta deseado.
	 * @param {UserDecoratorType} user El usuario que se está actualizando.
	 * @returns {GetUserControllerResponse} La respuesta correspondiente al controlador.
	 */
	@Patch(UserControllerConstants.UPDATE_USER_CARD_DESIGN_URL)
	@AuthDecorator()
	@ApiOkResponse({ type: GetUserControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async updateCardDesign(
		@Body() body: UpdateUserCardDesignControllerRequest,
		@UserDecorator() user: UserDecoratorType,
	): Promise<GetUserControllerResponse> {
		const response: GetUserControllerResponse = new GetUserControllerResponse();
		const cardDesign: CardDesign = await this.cardDesignService.getActiveById(new CardDesignId(body.cardDesignId));
		const data: User = await this.service.updateCardDesign(new UserId(user.userId), cardDesign);
		response.user = new GetUserResponseData(data.toDTO());
		return response;
	}

	/**
	 * Controlador PATCH que permite actualizar el icono de un usuario.
	 * @param body El icono deseado.
	 * @param user El usuario que se está actualizando.
	 * @returns {DefaultResponse} La respuesta correspondiente al controlador.
	 */
	@Patch(UserControllerConstants.UPDATE_USER_ICON)
	@AuthDecorator()
	@ApiOkResponse({ type: DefaultResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async updateIcon(
		@Body() body: UpdateUserIconController,
		@UserDecorator() user: UserDecoratorType,
	): Promise<DefaultResponse> {
		await this.service.updateIcon(
			new UserId(user.userId),
			new UserIcon(body.icon),
		);
		return new DefaultResponse();
	}
}