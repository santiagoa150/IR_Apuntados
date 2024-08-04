import { ApiProperty } from '@nestjs/swagger';
import { CardWithDesign, CardWithDesignDTO } from '../card/card-with-design';
import { DomainBase } from '../shared/domain.base';

/**
 * El objeto de transferencia de datos de las cartas desechadas.
 */
export class DiscardedCardsDTO {
	@ApiProperty({ type: [CardWithDesignDTO] }) cards: CardWithDesignDTO[];
}

export class DiscardedCards extends DomainBase<DiscardedCardsDTO> {

	private readonly _cards: CardWithDesign[];

	/**
	 * @param cards Las cartas desechadas.
	 */
	constructor(cards: CardWithDesign[]) {
		super();
		this._cards = cards;
	}

	get cards(): CardWithDesign[] {
		return this._cards;
	}

	/**
	 * Convierte el objeto de transferencia de datos de las cartas desechadas en su modelo de dominio.
	 * @param {DiscardedCardsDTO} dto El objeto de transferencia de datos siendo mapeado.
	 * @returns {DiscardedCards} Las nuevas cartas desechadas.
	 * @static
	 */
	static async fromDTO(dto: DiscardedCardsDTO): Promise<DiscardedCards> {
		return new DiscardedCards(
			await Promise.all(dto.cards.map(async (c) => CardWithDesign.fromDTO(c))),
		);
	}

	/**
	 * Convierte las cartas desechadas en su objeto de transferencia de datos.
	 * @returns {DiscardedCardsDTO} El nuevo objeto de transferencia de datos.
	 */
	async toDTO(): Promise<DiscardedCardsDTO> {
		return {
			cards: await Promise.all(this._cards.map(async (c) => c.toDTO())),
		};
	}
}