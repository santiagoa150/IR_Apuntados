import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se intenta ingresar a un juego que
 * ya fué iniciado.
 * @class
 * @extends Exception
 */
export class GameIsAlreadyStartedException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.GAME_IS_ALREADY_STARTED,
			HttpStatus.BAD_REQUEST,
		);
	}
}