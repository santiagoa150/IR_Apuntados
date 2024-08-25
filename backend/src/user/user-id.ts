import { IdValueObject } from '../shared/id.value-object';
import { InvalidUserIdException } from './exceptions/invalid-user-id.exception';
import { v4, validate } from 'uuid';

/**
 * Clase que representa el ID de un usuario.
 * @class
 * @extends {IdValueObject}
 */
export class UserId extends IdValueObject {

	/**
	 * Función encargada de generar los IDS de los usuarios.
	 * @returns {string} El ID generado.
	 * @static
	 */
	static create(): string {
		return v4();
	}

	/**
	 * Función encargada de validar las características del ID de un usuario.
	 * @param {string} value El ID para validar.
	 * @protected
	 * @throws {InvalidUserIdException} En caso de que el ID no sea válido se lanza la excepción.
	 */
	protected validate(value: string): void {
		if (!validate(value)) throw new InvalidUserIdException();
	}
}