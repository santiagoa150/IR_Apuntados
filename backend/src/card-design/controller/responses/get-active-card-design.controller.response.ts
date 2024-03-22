import { ApiProperty } from '@nestjs/swagger';
import { CardDesignDTO } from '../../card-design';

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
 */
export class GetActiveCardDesignsControllerResponse {
	@ApiProperty({ type: [GetActiveCardDesignsResponseData] })
		data: Array<GetActiveCardDesignsResponseData>;
}