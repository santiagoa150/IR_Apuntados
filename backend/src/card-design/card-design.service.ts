import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CardDesignDocument } from '../database/card-design.schema';
import { CardDesign, CardDesignDTO } from './card-design';
import { DefaultCardDesignNotFoundException } from './exceptions/default-card-design-not-found.exception';
import { DatabaseConstants } from '../database/database.constants';

/**
 * Clase que contiene los servicios para interactuar con los
 * diseños de cartas del sistema.
 * @class
 */
@Injectable()
export class CardDesignService {

	private readonly logger: Logger = new Logger(CardDesignService.name);

	/**
	 * @param {Model<CardDesignDocument>} model Modelo para interactuar con
	 * la base de datos de los diseños de cartas.
	 */
	constructor(
		@Inject(DatabaseConstants.CARD_DESIGN_PROVIDER) private readonly model: Model<CardDesignDocument>,
	) {
	}

	/**
	 * Método que permite buscar el diseño de carta por defecto del sistema.
	 * @returns {Promise<CardDesign>} Se retorna el diseño solicitado.
	 * @throws {DefaultCardDesignNotFoundException} Se lanza cuando no se encuentra
	 * el diseño de carta solicitado.
	 */
	async getDefault(): Promise<CardDesign> {
		this.logger.log(`[${this.getDefault.name}] INIT ::`);
		const found: CardDesignDTO = await this.model.findOne({ isDefault: true, isActive: true });
		const mapped: CardDesign = found ? CardDesign.fromDTO(found) : undefined;
		if (!mapped) throw new DefaultCardDesignNotFoundException();
		this.logger.log(`[${this.getDefault.name}] FINISH ::`);
		return mapped;
	}
}