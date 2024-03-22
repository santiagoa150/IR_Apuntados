import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exception-messages.constants';

/**
 * Clase que representa los datos requeridos para crear un juego.
 * @class
 */
export class CreateGameControllerRequest {
	@ApiProperty({ required: true })
	@Max(6, { message: ExceptionMessagesConstants.REQUIRED_PLAYERS_MUST_BE_IN_RANGE_ERROR })
	@Min(2, { message: ExceptionMessagesConstants.REQUIRED_PLAYERS_MUST_BE_IN_RANGE_ERROR })
	@IsInt({ message: ExceptionMessagesConstants.REQUIRED_PLAYERS_MUST_BE_A_INTEGER_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.REQUIRED_PLAYERS_IS_REQUIRED_ERROR })
		requiredPlayers: number;

	@ApiProperty({ required: true })
	@IsBoolean({ message: ExceptionMessagesConstants.IS_PUBLIC_MUST_BE_A_BOOLEAN_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.IS_PUBLIC_IS_REQUIRED_ERROR })
		isPublic: boolean;

	@ApiProperty({ required: true })
	@Min(1, { message: ExceptionMessagesConstants.BET_BY_PLAYER_MUST_BE_GREATER_THAN_0_ERROR })
	@IsInt({ message: ExceptionMessagesConstants.BET_BY_PLAYER_MUST_BE_A_INTEGER_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.BET_BY_PLAYER_IS_REQUIRED_ERROR })
		betByPlayer: number;

	@ApiProperty({ required: true })
	@IsString({ message: ExceptionMessagesConstants.GAME_NAME_MUST_BE_A_STRING_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.GAME_NAME_IS_REQUIRED_ERROR })
		name: string;
}