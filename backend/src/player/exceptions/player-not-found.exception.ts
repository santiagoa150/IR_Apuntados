import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { Exception } from '../../shared/exceptions/exception';

/**
 * Excepción lanzada cuando se solicita un jugador que no existe.
 * @class
 * @extends {Exception}
 */
export class PlayerNotFoundException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.PLAYER_NOT_FOUND_ERROR,
			HttpStatus.NOT_FOUND,
		);
	}
}