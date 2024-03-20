import { StringValueObject } from './string.value-object';

/**
 * Clase que representa los estados de algún objeto de la aplicación.
 *
 * @class
 * @template T Representa las constantes de los estados.
 * @extends StringValueObject
 */
export abstract class StatusValueObject<T extends string> extends StringValueObject {

	/**
	 * @param {string} value El valor que se está almacenando.
	 * @protected
	 */
	constructor(value: string) {
		super(value);
		this.validate(value);
	}

	/**
	 * Método que se encarga de cambiar el estado de un objeto
	 * por otro.
	 * @param {T} value El nuevo estado.
	 */
	public change(value: T): void {
		this.value = value;
	}

	/**
	 * Método encargado de validar si el estado de un objeto es válido.
	 * @param {string} value El estado para validar.
	 */
	protected abstract validate(value: string): void;
}