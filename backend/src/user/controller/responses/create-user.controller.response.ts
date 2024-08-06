import { DefaultResponse } from '../../../shared/default.response';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa la respuesta del controlador para crear un usuario.
 *
 * @class
 * @extends DefaultResponse
 */
export class CreateUserControllerResponse extends DefaultResponse {
	@ApiProperty() accessToken: string;
	@ApiProperty() refreshToken: string;
	@ApiProperty() userId: string;
}