import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se intenta acceder a los
 * recursos de un juego que ya está terminado.
 * @class
 * @extends Exception
 */
export class GameIsAlreadyFinishedException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.GAME_IS_ALREADY_FINISHED_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}