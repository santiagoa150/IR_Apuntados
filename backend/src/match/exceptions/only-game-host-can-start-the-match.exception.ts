import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando un usuario diferente al creador del juego
 * intenta iniciar la partida.
 */
export class OnlyGameHostCanStartTheMatchException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.ONLY_GAME_HOST_CAN_START_THE_MATCH_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}