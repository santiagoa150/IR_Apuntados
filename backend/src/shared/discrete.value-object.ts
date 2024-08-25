import { StringValueObject } from './string.value-object';

export abstract class DiscreteValueObject extends StringValueObject {

	/**
	 * @param {string} value El valor que se está almacenando.
	 * @protected
	 */
	constructor(value: string) {
		super(value);
		this.validate(value);
	}

	/**
	 * Función encargada de validar si el estado de un objeto es válido.
	 * @param {string} value El estado para validar.
	 */
	protected abstract validate(value: string): void;
}