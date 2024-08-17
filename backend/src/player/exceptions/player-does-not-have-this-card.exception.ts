import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada para indicar que un jugador no tiene una carta.
 */
export class PlayerDoesNotHaveThisCardException extends Exception {

	constructor() {
		super(
			ExceptionMessagesConstants.PLAYER_DOES_NOT_HAVE_THIS_CARD_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}