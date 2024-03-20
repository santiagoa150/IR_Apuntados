import { DefaultResponse } from '../../../shared/default.response';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa la respuesta del controlador para que un
 * usuario inicie sesión.
 *
 * @class
 * @extends DefaultResponse
 */
export class LoginControllerResponse extends DefaultResponse {
	@ApiProperty() accessToken: string;
	@ApiProperty() refreshToken: string;
}