import { StringValueObject } from 'src/shared/string.value-object';
import { InvalidPasswordError } from './exceptions/invalid-password.error';
import { SHA256 } from 'crypto-js';

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
	private static regexp: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&()*,\-.:;<>?^_{|}~¡¿])\S{8,}$/;

	/**
	 * Método que permite construir la contraseña de un usuario.
	 * @param {string} value El valor básico de la contraseña.
	 * @returns {string} El valor generado.
	 */
	static hash(value: string): string {
		return SHA256(value).toString();
	}

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

	/**
	 * Método que permite comparar la contraseña con un valor
	 * cualquiera.
	 * @param {string} value El valor que se quiere comparar
	 * @returns {boolean} Determina si los valores son iguales.
	 */
	compare(value: string): boolean {
		return UserPassword.hash(value) === this.value;
	}
}