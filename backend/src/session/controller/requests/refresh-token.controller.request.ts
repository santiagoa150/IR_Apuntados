import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exception-messages.constants';

/**
 * Clase que representa los datos requeridos para que un
 * usuario pueda refrescar su token de acceso.
 *
 * @class
 */
export class RefreshTokenControllerRequest {
	@ApiProperty()
	@IsString({ message: ExceptionMessagesConstants.REFRESH_TOKEN_MUST_BE_STRING })
	@IsNotEmpty({ message: ExceptionMessagesConstants.REFRESH_TOKEN_IS_REQUIRED})
		refreshToken: string;
}