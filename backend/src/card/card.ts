import { ApiProperty } from '@nestjs/swagger';
import { DomainBase } from '../shared/domain.base';
import { CardType } from './card-type';
import { CardSuit } from './card-suit';

/**
 * Clase que representa el objeto de transferencia de las cartas.
 * @class
 */
export class CardDTO {
	@ApiProperty() type: string;
	@ApiProperty() suit: string;
}

/**
 * Clase que representa una carta y sus acciones disponibles.
 * @class
 * @extends {DomainBase<CardDTO>}
 */
export class Card extends DomainBase<CardDTO> {
	private readonly _type: CardType;
	private readonly _suit: CardSuit;

	/**
	 * @param {CardType} type El tipo de la carta.
	 * @param {CardSuit} suit La pinta de la carta.
	 */
	constructor(type: CardType, suit: CardSuit) {
		super();
		this._type = type;
		this._suit = suit;
	}

	get type(): CardType {
		return this._type;
	}

	get suit(): CardSuit {
		return this._suit;
	}

	/**
	 * Convierte el objeto de transferencia de la carta al modelo de dominio
	 * @param {CardDTO} dto El objeto de transferencia.
	 * @returns {Card} La carta.
	 * @static
	 */
	static fromDTO(dto: CardDTO): Card {
		return new Card(new CardType(dto.type), new CardSuit(dto.suit));
	}

	/**
	 * Convierte la carta a su objeto de transferencia.
	 * @returns {CardDTO} EL objeto de transferencia.
	 */
	toDTO(): CardDTO {
		return {
			type: this._type.toString(),
			suit: this._suit.toString(),
		};
	}

	/**
	 * Determina cuál es la siguiente carta a partir de un valor.
	 * @param {number} current El valor actual de una carta.
	 * @returns {number} La carta siguiente.
	 */
	static getNextValue(current: number): number {
		let next: number = current + 1;
		if (next > 13) next = 1;
		return next;
	}
}
