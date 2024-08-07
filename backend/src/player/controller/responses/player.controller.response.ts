import { ApiProperty } from '@nestjs/swagger';
import { PlayerDTO } from '../../player';
import { DefaultResponse } from '../../../shared/default.response';

/**
 * La respuesta por defecto del controlador de los jugadores.
 */
export class PlayerControllerResponse extends DefaultResponse {
	@ApiProperty({ type: PlayerDTO }) player: PlayerDTO;
	@ApiProperty() currentDesignName: string;
}