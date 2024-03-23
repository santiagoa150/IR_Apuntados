import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exception-messages.constants';

/**
 * Clase que representa los datos requeridos para ingresar a un juego.
 * @class
 */
export class JoinGameControllerRequest {

	@ApiProperty({ required: true })
	@IsString({ message: ExceptionMessagesConstants.GAME_ID_MUST_BE_A_STRING_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.GAME_ID_IS_REQUIRED_ERROR })
		gameId: string;
}