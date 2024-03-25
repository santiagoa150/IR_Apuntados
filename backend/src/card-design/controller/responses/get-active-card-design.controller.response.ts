import { ApiProperty } from '@nestjs/swagger';
import { CardDesignDTO } from '../../card-design';
import { DefaultResponse } from '../../../shared/default.response';

/**
 * Clase en dónde se define la data en la respuesta del controlador.
 * @class
 * @extends CardDesignDTO
 */
export class GetActiveCardDesignsResponseData extends CardDesignDTO {
	@ApiProperty() canSelect: boolean;
}

/**
 * Clase que define la respuesta de cuando se intenta acceder a los
 * diseños de carta activos.
 * @class
 * @extends DefaultResponse
 */
export class GetActiveCardDesignsControllerResponse extends DefaultResponse{
	@ApiProperty({ type: [GetActiveCardDesignsResponseData] })
		data: Array<GetActiveCardDesignsResponseData>;
}