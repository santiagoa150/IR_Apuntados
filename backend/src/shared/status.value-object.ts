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
	 * Función que permite validar si el estado corresponde a un valor cualquiera.
	 * @param {T} value El valor a comparar.
	 * @returns {boolean} Determina si el valor es válido.
	 */
	is(value: T): boolean {
		return this.value === value;
	}

	/**
	 * Función que se encarga de cambiar el estado de un objeto por otro.
	 * @param {T} value El nuevo estado.
	 */
	change(value: T): void {
		this.value = value;
	}
}