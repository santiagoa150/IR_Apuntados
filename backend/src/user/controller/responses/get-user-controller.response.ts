import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from '../../user';
import { Exclude } from 'class-transformer';
import { DefaultResponse } from '../../../shared/default.response';

/**
 * Clase en dónde se define la data en la respuesta del controlador.
 *
 * @extends {OmitType(UserDTO, ['password'])}
 * @class
 */
export class GetUserResponseData extends UserDTO {
	@Exclude() password: string;
	@Exclude() cardDesigns: Array<string>;

	constructor(data: UserDTO) {
		super();
		Object.assign(this, data);
	}
}

/**
 * Clase que define la respuesta de cuando se intenta acceder a los
 * datos de un usuario.
 *
 * @class
 */
export class GetUserControllerResponse extends DefaultResponse {
	@ApiProperty({ type: GetUserResponseData }) user: GetUserResponseData;
}