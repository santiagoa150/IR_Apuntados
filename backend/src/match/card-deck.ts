import { Card, CardDTO } from '../card/card';
import { ApiProperty } from '@nestjs/swagger';
import { DomainBase } from '../shared/domain.base';

/**
 * Clase que representa el objeto de transferencia de datos del mazo de cartas.
 */
export class CardDeckDTO {
	@ApiProperty({ type: [CardDTO] }) cards: CardDTO[];
}

/**
 * Clase que representa los mazos de cartas.
 */
export class CardDeck extends DomainBase<CardDeckDTO> {

	private readonly _cards: Card[];

	/**
	 * @param cards Las cartas disponibles en el mazo de cartas.
	 */
	constructor(cards: Card[]) {
		super();
		this._cards = cards;
	}

	get cards(): Card[] {
		return this._cards;
	}

	/**
	 * Convierte un objeto de transferencia de datos en un mazo de cartas.
	 * @param {CardDeckDTO} dto El objeto de transferencia de datos siendo mapeado.
	 * @returns {CardDeck} El nuevo mazo de cartas.
	 * @static
	 */
	static async fromDTO(dto: CardDeckDTO): Promise<CardDeck> {
		return new CardDeck(
			await Promise.all(dto.cards.map(async (c) => Card.fromDTO(c))),
		);
	}

	/**
	 * Convierte el mazo de cartas en su objeto de transferencia de datos.
	 * @returns {CardDeckDTO} El nuevo objeto de transferencia de datos.
	 */
	async toDTO(): Promise<CardDeckDTO> {
		return {
			cards: await Promise.all(this._cards.map(async (c) => c.toDTO())),
		};
	}
}