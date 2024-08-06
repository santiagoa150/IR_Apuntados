import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando no se puede iniciar un juego.
 * @extends {Exception}
 */
export class GameCannotBeStartedException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.GAME_CANNOT_BE_STARTED_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}