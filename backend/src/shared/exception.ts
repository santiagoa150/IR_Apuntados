import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from './exception-messages.constants';

/**
 * Clase que define los errores de la aplicación.
 * @class
 * @extends HttpException
 */
export class Exception extends HttpException {
	/**
	 * @constructor
	 * @param {ExceptionMessagesConstants} customMessage El mensaje de error.
	 * @param {HttpStatus} status El código de error.
	 */
	constructor(
		public readonly customMessage: ExceptionMessagesConstants,
		status: HttpStatus,
	) {
		super({ message: customMessage }, status);
	}
}
