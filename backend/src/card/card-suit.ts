import { DiscreteValueObject } from '../shared/discrete.value-object';
import { CardSuitConstants } from './card-suit.constants';
import { InvalidCardSuitException } from './exceptions/invalid-card-suit-exception';

/**
 * Clase que representa la pinta de una carta.
 * @class
 * @extends DiscreteValueObject
 */
export class CardSuit extends DiscreteValueObject {

	/**
	 * Método que determina si la pinta de una carta no es válida.
	 * @param {string} value La pinta de la carta.
	 * @throws {InvalidCardSuitException} Se lanza si la pinta de una carta no es válida.
	 * @protected
	 */
	protected validate(value: string): void {
		if (!(value in CardSuitConstants)) throw new InvalidCardSuitException();
	}
}