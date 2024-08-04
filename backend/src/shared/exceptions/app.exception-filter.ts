import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { HttpArgumentsHost, RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';
import { Exception } from './exception';
import { ExceptionResponse, ExceptionResponseDTO } from './exception.response';
import { Socket } from 'socket.io';
import { SocketSharedConstants } from '../socket/socket-shared.constants';

/**
 * Clase que se encarga de manejar los errores de la aplicación.
 * @class
 * @implements {ExceptionFilter}
 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {

	/**
	 * Método que se encarga de resolver el mensaje de error de
	 * una excepción desconocida.
	 *
	 * @static
	 * @param exception La excepción desconocida.
	 * @returns {string | undefined} El mensaje de error resuelto, en caso de no
	 * poder resolver el mensaje retorna undefined.
	 */
	public static resolveMessage(exception): string | undefined {
		if (typeof exception === 'object') {
			if (exception.response?.message) {
				if (Array.isArray(exception.response.message)) {
					return exception.response.message.join(', ');
				} else if (typeof exception.response.message === 'string') {
					return exception.response.message;
				}
			} else if (exception.message && typeof exception.message == 'string') {
				return exception.message;
			}
		}
		if (typeof exception === 'string') {
			return exception;
		}
		return undefined;
	}

	/**
	 * Método que se encarga de resolver el código de error de
	 * una excepción desconocida.
	 *
	 * @param {Error} exception La excepción desconocida.
	 * @returns {number | undefined} El código de error resuelto, en caso de no
	 * poder resolver el código retorna undefined.
	 */
	public static resolveStatus(exception: Error): number | undefined {
		return exception instanceof HttpException ? exception.getStatus() : undefined;
	}

	/**
	 * Método que se encarga de enviar al usuario final la respuesta de error
	 * dependiendo del contexto de ejecución.
	 *
	 * @param {ArgumentsHost} host El contexto de ejecución.
	 * @param {ExceptionResponseDTO} responseDto La respuesta para enviar.
	 * @private
	 * @static
	 */
	private static setExceptionResponse(
		host: ArgumentsHost,
		responseDto: ExceptionResponseDTO,
	): void {
		let context: RpcArgumentsHost | HttpArgumentsHost | WsArgumentsHost;
		let response: Response;
		switch (host.getType()) {
		case 'http':
			context = host.switchToHttp();
			response = context.getResponse<Response>();
			response.status(responseDto.code).json(responseDto);
			break;
		case 'ws': {
			context = host.switchToWs();
			const client = context.getClient<Socket>();
			client.emit(SocketSharedConstants.LISTENER_ERROR_MESSAGES, responseDto);
			break;
		}
		default:
			throw responseDto;
		}
	}

	/**
	 * Método que recibe las excepciónes del sistema y las mapea para enviar
	 * al usuario final.
	 *
	 * @param {Error} exception La excepción que se quiere mapear
	 * @param {ArgumentsHost} host El contexto de ejecución.
	 */
	catch(exception: Error, host: ArgumentsHost): void {
		let response: ExceptionResponse;
		if (exception instanceof Exception) {
			response = ExceptionResponse.fromExceptionBase(exception);
		} else {
			response = new ExceptionResponse(
				AppExceptionFilter.resolveMessage(exception),
				AppExceptionFilter.resolveStatus(exception),
			);
		}
		const responseDto: ExceptionResponseDTO = response.toDTO();
		new Logger().error(`[${AppExceptionFilter.name}] ERROR :: ${JSON.stringify(responseDto)}`);
		AppExceptionFilter.setExceptionResponse(host, responseDto);
	}
}
