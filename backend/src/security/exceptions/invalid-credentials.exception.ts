import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando las credenciales de inicio de sesión de un usuario no
 * son válidas.
 * @class
 * @extends {Exception}
 */
export class InvalidCredentialsException extends Exception {

	/**
	 * @param {ExceptionMessagesConstants} [message=ExceptionMessagesConstants.INVALID_CREDENTIALS_ERROR]
	 * Mensaje de error en la excepción.
	 */
	constructor(message: ExceptionMessagesConstants = ExceptionMessagesConstants.INVALID_CREDENTIALS_ERROR) {
		super(message, HttpStatus.UNAUTHORIZED);
	}
}