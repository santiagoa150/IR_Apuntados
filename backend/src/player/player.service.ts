import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { PlayerDocument } from '../database/player.schema';

@Injectable()
export class PlayerService {

	private readonly logger: Logger = new Logger(PlayerService.name);

	/**
	 * @param {Model<PlayerDocument>} model Modelo para interactuar con la
	 * base de datos de los jugadores.
	 */
	constructor(
		@Inject(DatabaseConstants.PLAYER_PROVIDER) private readonly model: Model<PlayerDocument>,
	) {
	}
}