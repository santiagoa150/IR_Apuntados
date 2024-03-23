import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from '../../../shared/default.response';

/**
 * Clase que representa la respuesta para el controlador que
 * refresca el token de acceso un usuario.
 * @class
 */
export class RefreshTokenControllerResponse extends DefaultResponse {
	@ApiProperty() accessToken: string;
}