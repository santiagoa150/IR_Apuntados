import { ApiProperty } from '@nestjs/swagger';
import { PlayerControllerResponse } from './player.controller.response';

/**
 * Datos en la respuesta del controlador que determina si el jugador puede ganar o no.
 */
export class WinMatchControllerResponse extends PlayerControllerResponse {
	@ApiProperty({ description: 'Booleano que determina si el jugador puede ganar o no.' })
		canWin: boolean;
}
