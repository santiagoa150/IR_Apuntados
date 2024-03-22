import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se valida un ID de juego
 * y no cumple con las características requeridas por la aplicación.
 * @class
 * @extends Exception
 */
export class InvalidGameIdException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_GAME_ID_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}