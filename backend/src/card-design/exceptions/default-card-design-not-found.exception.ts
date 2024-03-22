import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada cuando se solicita el diseño de carta
 * por defecto y no existe.
 * @class
 * @extends {Exception}
 */
export class DefaultCardDesignNotFoundException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.DEFAULT_CARD_DESIGN_NOT_FOUND_ERROR,
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
}