import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada para indicar que no hay cartas desechadas.
 */
export class NoDiscardedCardsException extends Exception {
	constructor() {
		super(ExceptionMessagesConstants.NO_DISCARDED_CARDS_ERROR, HttpStatus.BAD_REQUEST);
	}
}
