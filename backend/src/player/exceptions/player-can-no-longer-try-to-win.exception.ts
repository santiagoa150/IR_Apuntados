import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada cuando un jugador no puede intentar ganar más.
 * @extends {Exception}
 */
export class PlayerCanNoLongerTryToWinException extends Exception {
	constructor() {
		super(ExceptionMessagesConstants.PLAYER_CAN_NO_LONGER_TRY_TO_WIN_ERROR, HttpStatus.BAD_REQUEST);
	}
}
