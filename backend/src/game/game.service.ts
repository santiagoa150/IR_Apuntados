import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { GameDocument } from '../database/game.schema';

/**
 * Clase que contiene los servicios para interactuar con los
 * juegos del sistema.
 * @class
 */
@Injectable()
export class GameService {

	private readonly logger: Logger = new Logger(GameService.name);

	/**
	 * @param {Model<GameDocument>} model Modelo para interactuar con la base de
	 * datos de los juegos.
	 */
	constructor(
		@Inject(DatabaseConstants.GAME_PROVIDER) private readonly model: Model<GameDocument>,
	) {
	}
}