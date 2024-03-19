/**
 * Clase que representa los strings importantes
 * de la aplicación.
 * @class
 */
export class StringValueObject {

	protected value: string;

	/**
	 * @param {string} value El valor que se está almacenando.
	 */
	constructor(value: string) {
		this.value = value;
	}

	/**
	 * Extrae el valor almacenado y lo convierte a un string.
	 * @returns {string}
	 */
	toString(): string {
		return this.value;
	}
}