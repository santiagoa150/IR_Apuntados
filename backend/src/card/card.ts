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
	@ApiProperty() value: number;
}

/**
 * Clase que representa una carta y sus acciones disponibles.
 * @class
 * @extends {DomainBase<CardDTO>}
 */
export class Card extends DomainBase<CardDTO> {

	private readonly _type: CardType;
	private readonly _suit: CardSuit;
	private readonly value: number;

	/**
	 * @param {CardType} type El tipo de la carta.
	 * @param {CardSuit} suit La pinta de la carta.
	 * @param {number} value El valor numérico de la carta.
	 */
	constructor(type: CardType, suit: CardSuit, value: number) {
		super();
		this._type = type;
		this._suit = suit;
		this.value = value;
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
		return new Card(
			new CardType(dto.type),
			new CardSuit(dto.suit),
			dto.value,
		);
	}

	/**
	 * Convierte la carta a su objeto de transferencia.
	 * @returns {CardDTO} EL objeto de transferencia.
	 */
	toDTO(): CardDTO {
		return {
			type: this._type.toString(),
			suit: this._suit.toString(),
			value: this.value.valueOf(),
		};
	}
}