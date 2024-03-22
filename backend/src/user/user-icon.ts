import { StringValueObject } from '../shared/string.value-object';
import { UserIconConstants } from './user-icon.constants';
import { InvalidUserIconException } from './exceptions/invalid-user-icon.exception';

/**
 * Clase que representa el icono de un usuario.
 * @class
 * @extends StringValueObject
 */
export class UserIcon extends StringValueObject {

	constructor(value: string) {
		super(value);
		this.validate(value);
	}

	/**
	 * Método que permite seleccionar un icono de usuario aleatoriamente
	 * @returns {string} El icono seleccionado.
	 * @static
	 */
	static generate(): string {
		const icons: Array<string> = Object.values(UserIconConstants);
		return icons[Math.floor(Math.random() * icons.length)];
	}

	/**
	 * Método que determina si el icono de un usuario no es válido.
	 * @param {string} value El icono de un usuario.
	 * @private
	 * @throws {InvalidUserIconException} Se lanza si el icono del usuario no es válido.
	 */
	private validate(value: string): void {
		if (!(value in UserIconConstants)) throw new InvalidUserIconException();
	}
}