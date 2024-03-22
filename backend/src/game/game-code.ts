import { StringValueObject } from '../shared/string.value-object';

/**
 * Clase que representa el código de un juego.
 * @class
 * @extends StringValueObject
 */
export class GameCode extends StringValueObject {

	/**
	 * Método que permite generar un código de juego válido.
	 * @returns {string} El código generado.
	 * @static
	 */
	static create(): string {
		const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let rawCode: string = '';
		for (let i: number = 0; i < 8; i++) {
			const index: number = Math.floor(Math.random() * letters.length);
			rawCode += letters.charAt(index);
		}
		return rawCode;
	}
}