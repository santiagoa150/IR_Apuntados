import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa los datos requeridos para que un
 * usuario pueda iniciar sesión.
 *
 * @class
 */
export class LoginControllerRequest {
	@ApiProperty() username: string;
	@ApiProperty() password: string;
}