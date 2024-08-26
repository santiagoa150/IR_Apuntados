import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que permite indicar que un jugador aún no ha jalado una carta.
 */
export class PlayerHasNotPulledCardException extends Exception {
	constructor() {
		super(ExceptionMessagesConstants.PLAYER_HAS_NOT_PULLED_CARD_ERROR, HttpStatus.BAD_REQUEST);
	}
}