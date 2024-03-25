import { Controller, Get } from '@nestjs/common';
import { CardDesignControllerConstants } from './card-design.controller.constants';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardDesignService } from '../card-design.service';
import { AuthDecorator } from '../../security/auth.decorator';
import { ExceptionResponseDTO } from '../../shared/exception.response';
import { GetActiveCardDesignsControllerResponse } from './responses/get-active-card-design.controller.response';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { UserId } from '../../user/user-id';
import { GetCurrentCardDesignControllerResponse } from './responses/get-current-card-design.controller.response';
import { CardDesign } from '../card-design';

/**
 * Clase que contiene los puntos de entrada a la aplicación
 * para los diseños de cartas.
 * @class
 */
@Controller(CardDesignControllerConstants.CONTROLLER_PREFIX)
@ApiTags(CardDesignControllerConstants.CONTROLLER_TAG)
export class CardDesignController {

	/**
	 * @param {CardDesignService} service Los servicios que permiten interactuar
	 * con los diseños de cartas.
	 * @param {UserService} userService Los servicios que permiten interactuar
	 * con los usuarios.
	 */
	constructor(
		private readonly service: CardDesignService,
		private readonly userService: UserService,
	) {
	}

	/**
	 * Controlador GET que permite a un usuario acceder a los diseños de
	 * cartas activos.
	 * @param {UserDecoratorType} user El usuario que accede a los datos.
	 * @returns {GetActiveCardDesignsControllerResponse} Los diseños de carta.
	 */
	@Get(CardDesignControllerConstants.GET_ACTIVE_CARD_DESIGNS_URL)
	@AuthDecorator()
	@ApiOkResponse({ type: GetActiveCardDesignsControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getActive(@UserDecorator() user: UserDecoratorType): Promise<GetActiveCardDesignsControllerResponse> {
		const response: GetActiveCardDesignsControllerResponse = new GetActiveCardDesignsControllerResponse();
		const userData: User = await this.userService.getById(new UserId(user.userId));
		const data = await this.service.getAvailable(userData.cardDesigns);
		response.data = await Promise.all(data.map(async (data) => {
			return {
				...data.cardDesign.toDTO(),
				canSelect: data.canSelect,
			};
		}));
		return response;
	}

	/**
	 * Controlador GET que permite al usuario consultar su diseño de cartas actual.
	 * @param {UserDecoratorType} user El usuario que accede al diseño de carta
	 * @returns {GetCurrentCardDesignControllerResponse} El diseño de carta actual.
	 */
	@Get(CardDesignControllerConstants.GET_CURRENT_CARD_DESIGN)
	@AuthDecorator()
	@ApiOkResponse({ type: GetCurrentCardDesignControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getCurrent(@UserDecorator() user: UserDecoratorType): Promise<GetCurrentCardDesignControllerResponse> {
		const response: GetCurrentCardDesignControllerResponse = new GetCurrentCardDesignControllerResponse();
		const userData: User = await this.userService.getById(new UserId(user.userId));
		const data: CardDesign = await this.service.getActiveById(userData.currentDesignId);
		response.design = data.toDTO();
		return response;
	}
}