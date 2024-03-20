import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa la respuesta por defecto de
 * todos los controladores.
 * @class
 */
export class DefaultResponse {
	@ApiProperty() success: boolean = true;
}