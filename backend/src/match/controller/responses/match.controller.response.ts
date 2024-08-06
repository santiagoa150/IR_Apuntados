import { DefaultResponse } from '../../../shared/default.response';
import { ApiProperty } from '@nestjs/swagger';
import { MatchDTO } from '../../match';

/**
 * Respuesta genérica del controlador de las partidas.
 * @extends {DefaultResponse}
 */
export class MatchControllerResponse extends DefaultResponse {
	@ApiProperty({ type: MatchDTO }) data: MatchDTO;
}