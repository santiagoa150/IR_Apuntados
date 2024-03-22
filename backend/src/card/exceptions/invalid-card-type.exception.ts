import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';
import { Exception } from '../../shared/exception';

/**
 * Se lanza cuando el tipo de una carta no se encuentra en
 * el archivo de constantes.
 * @class
 * @extends Exception
 */
export class InvalidCardTypeException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_CARD_TYPE_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}