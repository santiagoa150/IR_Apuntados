import { HttpStatus } from '@nestjs/common';
import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';

/**
 * Excepción lanzada cuando se intenta crear un usuario que ya existe.
 * @class
 * @extends {Exception}
 */
export class UserAlreadyExistsException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.USER_ALREADY_EXISTS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}