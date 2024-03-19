import { StringValueObject } from 'src/shared/string.value-object';
import { InvalidPasswordError } from './exceptions/invalid-password.error';

/**
 * Clase que representa las contraseñas de los usuarios.
 * @class
 * @extends {StringValueObject}
 */
export class UserPassword extends StringValueObject {

	/**
	 * La estructura que debe cumplir una contraseña.
	 * @type {RegExp}
	 * @static
	 * @private
	 */
	private static regexp: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&()*,\-./:;<>?^_{|}~¡¿])\S{8,}$/;

	/**
	 * Método que permite validar la estructura de una contraseña
	 * de usuario.
	 * @param {string} value El valor para validar.
	 * @throws {InvalidPasswordError} Si la contraseña no cumple con las
	 * características requeridas por el sistema se lanza la excepción.
	 */
	static validate(value: string): void {
		if (!value.match(this.regexp)) throw new InvalidPasswordError();
	}
}