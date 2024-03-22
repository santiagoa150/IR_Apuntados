import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción que se lanza cuando se valida el ID de un diseño de carta
 * y no cumple con las características requeridas por la aplicación.
 * @class
 * @extends {Exception}
 */
export class InvalidCardDesignIdException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_CARD_DESIGN_ID_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}