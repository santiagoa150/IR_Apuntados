import { DiscreteValueObject } from './discrete.value-object';

/**
 * Clase que representa los estados de algún objeto de la aplicación.
 *
 * @class
 * @template T Representa las constantes de los estados.
 * @extends StringValueObject
 */
export abstract class StatusValueObject<T extends string> extends DiscreteValueObject {

	/**
	 * @param {string} value El valor que se está almacenando.
	 * @protected
	 */
	constructor(value: string) {
		super(value);
	}

	/**
	 * Método que se encarga de cambiar el estado de un objeto
	 * por otro.
	 * @param {T} value El nuevo estado.
	 */
	public change(value: T): void {
		this.value = value;
	}
}