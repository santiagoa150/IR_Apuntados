import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada para indicar que el estado de una partida no es válido.
 */
export class InvalidMatchStatusException extends Exception {

	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_MATCH_STATUS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}