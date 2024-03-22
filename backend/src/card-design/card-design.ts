import { CardDesignId } from './card-design-id';
import { ApiProperty } from '@nestjs/swagger';
import { DomainBase } from '../shared/domain.base';

/**
 * Clase que representa el objeto de transferencia de
 * un diseño de carta.
 * @class
 */
export class CardDesignDTO {
	@ApiProperty() cardDesignId: string;
	@ApiProperty() name: string;
	@ApiProperty() isDefault: boolean;
	@ApiProperty() isActive: boolean;
	@ApiProperty() isFree: boolean;
	@ApiProperty() price?: number;
}

/**
 * Clase que representa un diseño de carta y sus acciones disponibles.
 * @class
 * @extends {DomainBase<CardDesignDTO>}
 */
export class CardDesign extends DomainBase<CardDesignDTO> {

	public readonly cardDesignId: CardDesignId;
	public readonly isFree: boolean;
	private readonly name: string;
	private readonly isDefault: boolean;
	private readonly isActive: boolean;
	private readonly price?: number;

	/**
	 * @param {CardDesignId} cardDesignId El ID del diseño de carta.
	 * @param {string} name El nombre del diseño de cartas.
	 * @param {boolean} isDefault Bandera que determina si el diseño de carta es
	 * por defecto
	 * @param {boolean} isActive Bandera que determina si un diseño de carta está activo.
	 * @param {boolean} isFree Bandera que determina si un diseño de carta es gratuito.
	 * @param {number} [price] Precio de un diseño de cartas si no es gratuito.
	 */
	constructor(
		cardDesignId: CardDesignId,
		name: string,
		isDefault: boolean,
		isActive: boolean,
		isFree: boolean,
		price?: number,
	) {
		super();
		this.cardDesignId = cardDesignId;
		this.name = name;
		this.isDefault = isDefault;
		this.isActive = isActive;
		this.isFree = isFree;
		this.price = price;
	}

	/**
	 * Convierte el objeto de transferencia de un diseño de carta al
	 * modelo de dominio.
	 * @param {CardDesignDTO} dto El objeto de transferencia.
	 * @returns {CardDesign} El modelo de dominio.
	 * @static
	 */
	static fromDTO(dto: CardDesignDTO): CardDesign {
		return new CardDesign(
			new CardDesignId(dto.cardDesignId),
			dto.name,
			dto.isDefault,
			dto.isActive,
			dto.isFree,
			dto.price,
		);
	}

	/**
	 * Convierte el diseño de carta a su objeto de transferencia.
	 * @returns {CardDesignDTO} El objeto de transferencia del diseño de carta.
	 */
	toDTO(): CardDesignDTO {
		return {
			price: this.price,
			name: this.name,
			isFree: this.isFree,
			isActive: this.isActive,
			isDefault: this.isDefault,
			cardDesignId: this.cardDesignId.toString(),
		};
	}
}