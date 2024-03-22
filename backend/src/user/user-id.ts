import { IdValueObject } from '../shared/id.value-object';
import { InvalidUserIdException } from './exceptions/invalid-user-id.exception';
import * as uuid from 'uuid';

/**
 * Clase que representa el ID de un usuario.
 * @class
 * @extends {IdValueObject}
 */
export class UserId extends IdValueObject {

	/**
	 * Método encargado de generar los IDS de los usuarios.
	 * @returns {string} El ID generado.
	 * @static
	 */
	static create(): string {
		return uuid.v4();
	}

	/**
	 * Método encargado de validar las características del ID
	 * de un usuario.
	 * @param {string} value El ID para validar.
	 * @protected
	 * @throws {InvalidUserIdException} En caso de que el ID no sea válido se lanza la excepción.
	 */
	protected validate(value: string) {
		if (!uuid.validate(value)) throw new InvalidUserIdException();
	}
}