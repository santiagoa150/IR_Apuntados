import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se valida el icono de un usuario
 * y no cumple con las características requeridas por el sistema.
 * @class
 * @extends {Exception}
 */
export class InvalidUserIconException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_USER_ICON_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}