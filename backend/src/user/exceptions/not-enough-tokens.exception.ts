import {HttpStatus} from '@nestjs/common';
import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';

/**
 * Se lanza cuando un usuario intenta realizar una operación con tokens
 * y no hay suficientes.
 * @class
 * @extends {Exception}
 */
export class NotEnoughTokensException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.NOT_ENOUGH_TOKENS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}