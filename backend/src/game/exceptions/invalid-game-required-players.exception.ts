import { Exception } from 'src/shared/exception';
import { HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from '../../shared/exception-messages.constants';

/**
 * Excepción lanzada cuando la cantidad de jugadores requeridos
 * para un juego no es válida
 * @class
 * @extends {Exception}
 */
export class InvalidGameRequiredPlayersException extends Exception {
	constructor() {
		super(
			ExceptionMessagesConstants.INVALID_GAME_REQUIRED_PLAYERS_ERROR,
			HttpStatus.BAD_REQUEST,
		);
	}
}