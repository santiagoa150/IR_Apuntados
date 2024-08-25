import { StringValueObject } from './string.value-object';

/**
 * Clase que representa los ids de la aplicación.
 * @class
 * @abstract
 * @extends {StringValueObject}
 */
export abstract class IdValueObject extends StringValueObject {

	/**
	 * @param {string} value El valor que se está almacenando.
	 * @protected
	 */
	constructor(value: string) {
		super(value);
		this.validate(value);
	}

	/**
	 * Función abstracta que debe validar un ID de la aplicación.
	 * @param {string} value El valor a validar.
	 * @protected
	 */
	protected abstract validate(value: string): void;
}