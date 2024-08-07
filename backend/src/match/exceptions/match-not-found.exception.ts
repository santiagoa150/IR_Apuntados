import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada para indicar que que no se encontró una partida solicitada.
 */
export class MatchNotFoundException extends Exception {

	constructor() {
		super(
			ExceptionMessagesConstants.MATCH_NOT_FOUND_ERROR,
			HttpStatus.NOT_FOUND,
		);
	}
}