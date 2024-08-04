import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { Exception } from '../../shared/exceptions/exception';

/**
 * Excepción lanzada cuando se solicita un usuario que no existe.
 * @class
 * @extends {Exception}
 */
export class UserNotFoundException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.USER_NOT_FOUND_ERROR,
			HttpStatus.NOT_FOUND,
		);
	}
}