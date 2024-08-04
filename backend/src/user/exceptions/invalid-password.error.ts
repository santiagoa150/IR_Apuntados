import { HttpStatus } from '@nestjs/common';
import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';

/**
 * Excepción que se lanza cuando se valida la contraseña de un usuario
 * y no cumple con las características requeridas por el sistema.
 * @class
 * @extends {Exception}
 */
export class InvalidPasswordError extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_PASSWORD_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}