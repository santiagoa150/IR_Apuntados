import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Se lanza cuando la pinta de una carta no es válida.
 * @class
 * @extends Exception
 */
export class InvalidCardSuitException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_CARD_SUIT_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}