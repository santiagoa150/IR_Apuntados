import { Exception } from 'src/shared/exceptions/exception';
import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';

/**
 * Excepción lanzada cuando se valida si el estado de un usuario
 * se encuentra en el archivo de constantes.
 * @class
 * @extends {Exception}
 */
export class InvalidUserStatusException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_USER_STATUS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}