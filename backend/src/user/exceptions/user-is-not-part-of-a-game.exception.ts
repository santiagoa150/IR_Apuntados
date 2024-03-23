import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Se lanza cuando un usuario intenta acceder a recursos de un juego
 * en el cual no está jugando.
 * @class
 * @extends
 */
export class UserIsNotPartOfAGameException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.USER_IS_NOT_PART_OF_A_GAME_ERROR,
			HttpStatus.FORBIDDEN,
		);
	}
}