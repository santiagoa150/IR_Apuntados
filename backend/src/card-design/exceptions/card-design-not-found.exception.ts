import { Exception } from '../../shared/exception';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Excepción lanzada cuando se solicita el diseño de carta y no existe.
 * @class
 * @extends {Exception}
 */
export class CardDesignNotFoundException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.CARD_DESIGN_NOT_FOUND_ERROR,
			HttpStatus.NOT_FOUND,
		);
	}
}