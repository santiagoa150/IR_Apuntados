import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada cuando se solicita la actualización de un juego,
 * pero algo falla.
 * @class
 * @extends {Exception}
 */
export class GameNotUpdatedException extends Exception {

	constructor() {
		super(
			ExceptionMessagesConstants.GAME_NOT_UPDATED_ERROR,
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
}