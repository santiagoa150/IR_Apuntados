import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se intenta agregar un jugador a un juego que ya está lleno.
 * @class
 * @extends Exception
 */
export class GameExceedsItsPlayerCountException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.GAME_EXCEEDS_ITS_PLAYER_COUNT_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}