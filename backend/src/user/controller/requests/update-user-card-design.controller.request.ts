import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exceptions/exception-messages.constants';

/**
 * Clase que contiene los datos requeridos para actualizar el
 * diseño de carta de un usuario.
 * @class
 */
export class UpdateUserCardDesignControllerRequest {

	@ApiProperty({ required: true })
	@IsString({ message: ExceptionMessagesConstants.CARD_DESIGN_ID_MUST_BE_A_STRING_ERROR })
	@IsNotEmpty({ message: ExceptionMessagesConstants.CARD_DESIGN_ID_IS_REQUIRED_ERROR })
		cardDesignId: string;
}