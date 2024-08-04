import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se solicita un juego que no existe.
 * @class
 * @extends Exception
 */
export class GameNotFoundException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.GAME_NOT_FOUND_ERROR,
			HttpStatus.NOT_FOUND,
		);
	}
}