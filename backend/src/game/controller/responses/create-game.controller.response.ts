import { DefaultResponse } from '../../../shared/default.response';
import { ApiProperty } from '@nestjs/swagger';
import { GameDTO } from '../../game';

/**
 * Clase que representa la respuesta del controlador para crear un juego.
 * @class
 * @extends DefaultResponse
 */
export class CreateGameControllerResponse extends DefaultResponse {
	@ApiProperty({ type: GameDTO }) data: GameDTO;
}