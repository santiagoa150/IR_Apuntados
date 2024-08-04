import { Exception } from '../../shared/exceptions/exception';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada para indicar que el ID de una partida es inválido.
 * @extends {Exception}
 */
export class InvalidMatchIdException extends Exception {

	constructor() {
		super(ExceptionMessagesConstants.INVALID_MATCH_ID_ERROR, HttpStatus.BAD_REQUEST);
	}
}