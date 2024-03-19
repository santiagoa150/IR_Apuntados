import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

/**
 * Clase que contiene los puntos de entrada a la aplicación
 * para los usuarios.
 *
 * @class
 */
@Controller()
export class UserController {

	/**
	 * @param {UserService} service Los servicios que permiten
	 * interactuar con los usuarios.
	 */
	constructor(private readonly service: UserService) {
	}
}