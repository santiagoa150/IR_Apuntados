import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada cuando se valida si el estado de un juego
 * se encuentra en el archivo de constantes.
 * @class
 * @extends {Exception}
 */
export class InvalidGameStatusException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_GAME_STATUS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}