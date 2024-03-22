import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { Exception } from '../../shared/exception';

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