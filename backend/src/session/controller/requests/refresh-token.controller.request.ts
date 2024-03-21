import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa los datos requeridos para que un
 * usuario pueda refrescar su token de acceso.
 *
 * @class
 */
export class RefreshTokenControllerRequest {
	@ApiProperty() refreshToken: string;
}