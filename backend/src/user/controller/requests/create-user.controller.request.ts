import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exception-messages.constants';

/**
 * Clase que representa los datos requeridos para crear un usuario.
 *
 * @class
 */
export class CreateUserControllerRequest {

	@ApiProperty()
	@IsString({ message: ExceptionMessagesConstants.USERNAME_MUST_BE_STRING_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.USERNAME_IS_REQUIRED_ERROR })
		username: string;

	@ApiProperty({ required: true })
	@IsString({ message: ExceptionMessagesConstants.PASSWORD_MUST_BE_STRING })
	@IsNotEmpty({ message: ExceptionMessagesConstants.PASSWORD_IS_REQUIRED_ERROR })
		password: string;
}