import { UserStatusConstants } from './user-status.constants';
import { StatusValueObject } from '../shared/status.value-object';
import { InvalidUserStatusException } from './exceptions/invalid-user-status.exception';

/**
 * Clase que representa el estado de un usuario.
 * @class
 * @extends {StatusValueObject<UserStatusConstants>}
 */
export class UserStatus extends StatusValueObject<UserStatusConstants> {

	/**
	 * Método que determina si el estado de un usuario no es válido.
	 * @param {string} value El estado del usuario.
	 * @protected
	 * @throws {InvalidUserStatusException} Se lanza si el estado de un usuario no es válido.
	 */
	protected validate(value: string): void {
		if (!(value in UserStatusConstants)) throw new InvalidUserStatusException();
	}
}