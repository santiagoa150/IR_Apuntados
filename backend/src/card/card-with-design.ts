import { Card, CardDTO } from './card';
import { CardDesignId } from '../card-design/card-design-id';
import { CardType } from './card-type';
import { CardSuit } from './card-suit';
import { ApiProperty } from '@nestjs/swagger';

/**
 * El objeto de transferencia de datos de una carta con diseño.
 * @extends CardDTO La clase básica de las cartas.
 */
export class CardWithDesignDTO extends CardDTO {
	@ApiProperty() cardDesignId: string;
	@ApiProperty() cardDesignName: string;
}

/**
 * Clase que representa una carta con diseño.
 * @extends {Card}
 */
export class CardWithDesign extends Card {

	private readonly _cardDesignId: CardDesignId;
	private readonly _cardDesignName: string;

	/**
	 * @param {CardType} type El tipo de la carta.
	 * @param {CardSuit} suit La pinta de la carta.
	 * @param {number} value El valor numérico de la carta.
	 * @param {CardDesignId} cardDesignId El id del diseño de carta.
	 * @param {string} cardDesignName El nombre del diseño de carta.
	 */
	constructor(type: CardType, suit: CardSuit, value: number, cardDesignId: CardDesignId, cardDesignName: string) {
		super(type, suit, value);
		this._cardDesignId = cardDesignId;
		this._cardDesignName = cardDesignName;
	}

	get cardDesignId(): CardDesignId {
		return this._cardDesignId;
	}

	get cardDesignName(): string {
		return this._cardDesignName;
	}

	/**
	 * Convierte el objeto de transferencia de la carta con diseño al modelo de dominio
	 * @param {CardDTO} dto El objeto de transferencia.
	 * @returns {Card} La carta.
	 * @static
	 */
	static fromDTO(dto: CardWithDesignDTO): CardWithDesign {
		return new CardWithDesign(
			new CardType(dto.type),
			new CardSuit(dto.suit),
			dto.value,
			new CardDesignId(dto.cardDesignId),
			dto.cardDesignName,
		);
	}

	/**
	 * Convierte una carta con diseño en su objeto de transferencia de datos.
	 * @returns {CardWithDesignDTO} El nuevo objeto de transferencia de datos.
	 */
	toDTO(): CardWithDesignDTO {
		return {
			...super.toDTO(),
			cardDesignId: this._cardDesignId.toString(),
			cardDesignName: this._cardDesignName,
		};
	}
}