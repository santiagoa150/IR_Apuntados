import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando un jugador ya ha jalado carta.
 * @class
 * @extends Exception
 */
export class PlayerAlreadyPullCardException extends Exception {
	constructor() {
		super(ExceptionMessagesConstants.PLAYER_ALREADY_PULL_CARD_ERROR, HttpStatus.BAD_REQUEST);
	}
}
