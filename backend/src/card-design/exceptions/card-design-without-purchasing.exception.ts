import { Exception } from '../../shared/exceptions/exception';
import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from '../../shared/exceptions/exception-messages.constants';

/**
 * Excepción lanzada cuando se quiere seleccionar un diseño de carta
 * que no ha sido comprado.
 * @class
 * @extends {Exception}
 */
export class CardDesignWithoutPurchasingException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.CARD_DESIGN_WITHOUT_PURCHASING_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}