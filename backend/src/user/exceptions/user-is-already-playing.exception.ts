import { HttpStatus } from '@nestjs/common';
import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';

/**
 * Se lanza cuando se intenta cambiar el estado de un usuario a jugando,
 * cuando ya está jugando.
 * @class
 * @extends {Exception}
 */
export class UserIsAlreadyPlayingException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.USER_IS_ALREADY_PLAYING_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}