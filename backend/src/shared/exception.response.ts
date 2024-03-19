import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from './exception-messages.constants';
import { Exception } from './exception';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa la respuesta de error de la aplicación.
 * @class
 */
export class ExceptionResponse {
	public readonly message: string;
	public readonly code: number;
	private readonly success: boolean;

	/**
	 * @param {string} [message=ExceptionMessagesConstants.INTERNAL_SERVER_ERROR] El mensaje de error.
	 * @param {number} [code=HttpStatus.INTERNAL_SERVER_ERROR] El código de error.
	 */
	constructor(
		message: string = ExceptionMessagesConstants.INTERNAL_SERVER_ERROR,
		code: number = HttpStatus.INTERNAL_SERVER_ERROR,
	) {
		this.message = message;
		this.code = code;
		this.success = false;
	}

	/**
	 * Convierte una excepción básica al modelo de respuesta.
	 * @static
	 * @param {Exception} exception La excepción a convertir.
	 * @returns {ExceptionResponse}
	 */
	public static fromExceptionBase(exception: Exception): ExceptionResponse {
		return new ExceptionResponse(exception.message, exception.getStatus());
	}

	/**
	 * Convierte la respuesta de error a su objeto de transferencia.
	 * @public
	 * @returns {ExceptionResponseDTO}
	 */
	public toDTO(): ExceptionResponseDTO {
		return {
			code: this.code,
			message: this.message,
			success: this.success,
		};
	}
}

/**
 * Clase que representa el objeto de transferencia de la respuesta de un error
 * de la aplicación.
 * @class
 */
export class ExceptionResponseDTO {
	@ApiProperty() message: string;
	@ApiProperty() code: number;
	@ApiProperty() success: boolean;
}
