import { GameService } from '../game.service';
import { Controller } from '@nestjs/common';
import { GameControllerConstants } from './game.controller.constants';
import { ApiTags } from '@nestjs/swagger';

/**
 * Clase que contiene los puntos de entrada a la aplicación
 * para los usuarios.
 * @class
 */
@Controller(GameControllerConstants.CONTROLLER_PREFIX)
@ApiTags(GameControllerConstants.CONTROLLER_TAG)
export class GameController {

	/**
	 * @param {GameService} service Los servicios que permiten interactuar con los juegos.
	 */
	constructor(
		private readonly service: GameService,
	) {
	}
}