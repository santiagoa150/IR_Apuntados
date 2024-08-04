import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseConstants } from '../database/database.constants';
import { Model } from 'mongoose';
import { MatchDocument } from '../database/match.schema';

/**
 * Los servicios asociados a las partidas.
 */
@Injectable()
export class MatchService {

	private readonly logger: Logger = new Logger(MatchService.name);

	/**
	 * @param {Model<MatchDocument>} model Modelo para interactuar con la base de datos de las partidas.
	 */
	constructor(
		@Inject(DatabaseConstants.MATCH_PROVIDER) private readonly model: Model<MatchDocument>,
	) {
	}
}