import { IdValueObject } from '../shared/id.value-object';
import { InvalidCardDesignIdException } from './exceptions/invalid-card-design-id.exception';
import * as uuid from 'uuid';

/**
 * Clase que representa el ID de un diseño de carta.
 * @class
 * @extends {IdValueObject}
 */
export class CardDesignId extends IdValueObject {

	/**
	 * Método encargado de validar las características del ID
	 * de un diseño de carta.
	 * @param {string} value El ID para validar.
	 * @protected
	 * @throws {InvalidCardDesignIdException} En caso de que el ID no sea válido se lanza la excepción.
	 */
	protected validate(value: string) {
		if (!uuid.validate(value)) throw new InvalidCardDesignIdException();
	}
}