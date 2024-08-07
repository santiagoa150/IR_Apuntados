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

	private readonly type: CardType;
	private readonly suit: CardSuit;
	private readonly value: number;

	/**
	 * @param {CardType} type El tipo de la carta.
	 * @param {CardSuit} suit La pinta de la carta.
	 * @param {number} value El valor numérico de la carta.
	 */
	constructor(type: CardType, suit: CardSuit, value: number) {
		super();
		this.type = type;
		this.suit = suit;
		this.value = value;
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
			type: this.type.toString(),
			suit: this.suit.toString(),
			value: this.value.valueOf(),
		};
	}
}