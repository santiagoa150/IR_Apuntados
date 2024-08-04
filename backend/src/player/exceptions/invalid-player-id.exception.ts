import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se valida un ID de jugador
 * y no cumple con las características requeridas por la aplicación.
 * @class
 * @extends Exception
 */
export class InvalidPlayerIdException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_PLAYER_ID_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}