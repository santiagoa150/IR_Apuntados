import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model, PipelineStage } from 'mongoose';
import { CardDesignDocument } from '../database/card-design.schema';
import { CardDesign, CardDesignDTO } from './card-design';
import { DefaultCardDesignNotFoundException } from './exceptions/default-card-design-not-found.exception';
import { DatabaseConstants } from '../database/database.constants';
import { CardDesignId } from './card-design-id';
import { CardDesignNotFoundException } from './exceptions/card-design-not-found.exception';
import { CardDesignQueries } from './card-design.queries';

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
	 * Método que permite buscar todos los diseños de cartas disponibles y si
	 * son seleccionables o no.
	 * @param {Set<string>} userCardDesigns Los diseños de cartas del usuario.
	 * @returns {Promise<Array<{ cardDesign: CardDesign, canSelect: boolean }>>} Los
	 * diseños encontrados.
	 */
	async getAvailable(userCardDesigns: Set<string>): Promise<Array<{ cardDesign: CardDesign, canSelect: boolean }>> {
		this.logger.log(`[${this.getAvailable.name}] INIT ::`);
		const query: Array<PipelineStage> = CardDesignQueries.getCardDesignsAvailable(userCardDesigns);
		const aggregateResponse: Array<CardDesignDTO & { canSelect: boolean }> = await this.model.aggregate(query);
		const mapped: Array<{
			cardDesign: CardDesign,
			canSelect: boolean
		}> = await Promise.all(aggregateResponse.map(async (cd) => {
			return {
				cardDesign: CardDesign.fromDTO(cd),
				canSelect: cd.canSelect,
			};
		}));
		this.logger.log(`[${this.getAvailable.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Método que permite buscar un diseño de carta activo por ID.
	 * @param {CardDesignId} cardDesignId El diseño de carta que se solicita.
	 * @param {boolean} [throwExceptionIfNotFound=true] Bandera para determinar si se debe lanzar
	 * una excepción cuando el usuario solicitado no existe.
	 * @returns {CardDesign | undefined} Se retorna el diseño solicitado,
	 * si la bandera throwExceptionIfNotFound=false y el usuario solicitado no existe se retorna undefined.
	 * @throws {CardDesignNotFoundException} Se lanza cuando no se encuentra el diseño
	 * de carta solicitado.
	 */
	async getActiveById(cardDesignId: CardDesignId, throwExceptionIfNotFound: boolean = true): Promise<CardDesign | undefined> {
		this.logger.log(`[${this.getActiveById.name}] INIT :: cardDesignId: ${cardDesignId.toString()}`);
		const found: CardDesignDTO = await this.model.findOne({
			isActive: true,
			cardDesignId: cardDesignId.toString(),
		});
		const mapped: CardDesign = found ? CardDesign.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new CardDesignNotFoundException();
		this.logger.log(`[${this.getActiveById.name}] FINISH ::`);
		return mapped;
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