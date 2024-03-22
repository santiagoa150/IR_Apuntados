import { DiscreteValueObject } from '../shared/discrete.value-object';
import { CardTypeConstants } from './card-type.constants';
import { InvalidCardTypeException } from './exceptions/invalid-card-type.exception';

/**
 * Clase que representa el tipo de una carta.
 * @class
 * @extends {DiscreteValueObject}
 */
export class CardType extends DiscreteValueObject {

	/**
	 * Método que determina si el tipo de una carta no es válido.
	 * @param {string} value El tipo de la carta.
	 * @throws {InvalidCardTypeException} Se lanza si el tipo de una carta no es válido.
	 * @protected
	 */
	protected validate(value: string): void {
		if (!(value in CardTypeConstants)) throw new InvalidCardTypeException();
	}
}