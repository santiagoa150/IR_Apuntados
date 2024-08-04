import { Exception } from './exception';
import { ExceptionMessagesConstants } from './exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando un usuario tiene el usuario no tiene acceso
 * a un recurso.
 * @class
 * @extends {Exception}
 */
export class UnauthorizedException extends Exception {

	/**
	 * @param {ExceptionMessagesConstants} [message=ExceptionMessagesConstants.UNAUTHORIZED]
	 * Mensaje de error de la excepción.
	 */
	constructor(message: ExceptionMessagesConstants = ExceptionMessagesConstants.UNAUTHORIZED) {
		super(message, HttpStatus.UNAUTHORIZED);
	}
}