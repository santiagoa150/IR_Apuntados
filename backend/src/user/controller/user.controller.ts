import { Controller } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserControllerConstants } from './user.controller.constants';
import { ApiTags } from '@nestjs/swagger';

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
}