import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada cuando el estado de un jugador no es válido.
 * @class
 * @extends Exception
 */
export class InvalidPlayerStatusException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_PLAYER_STATUS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}