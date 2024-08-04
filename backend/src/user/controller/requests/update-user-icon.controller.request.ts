import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exceptions/exception-messages.constants';

/**
 * Clase que contiene los datos requeridos para actualizar el icono de un usuario.
 * @class
 */
export class UpdateUserIconController {

	@ApiProperty({ required: true })
	@IsString({ message: ExceptionMessagesConstants.USER_ICON_MUST_BE_A_STRING })
	@IsNotEmpty({ message: ExceptionMessagesConstants.USER_ICON_IS_REQUIRED })
		icon: string;
}