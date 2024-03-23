import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Se lanza cuando un usuario intenta acceder a recursos de un juego
 * en el cual no está jugando.
 */
export class UserIsNotPartOfTheGameException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.USER_IS_NOT_PART_OF_THE_GAME,
			HttpStatus.FORBIDDEN,
		);
	}
}