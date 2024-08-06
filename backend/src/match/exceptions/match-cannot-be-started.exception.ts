import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando no se puede iniciar una partida.
 */
export class MatchCannotBeStartedException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.MATCH_CANNOT_BE_STARTED_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}