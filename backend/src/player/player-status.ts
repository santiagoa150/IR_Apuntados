import { StatusValueObject } from '../shared/status.value-object';
import { PlayerStatusConstants } from './player-status.constants';
import { InvalidPlayerStatusException } from './exceptions/invalid-player-status.exception';

/**
 * Clase que representa el estado de un jugador.
 * @class
 * @extends {StatusValueObject<PlayerStatusConstants>}
 */
export class PlayerStatus extends StatusValueObject<PlayerStatusConstants> {

	/**
	 * Función que determina si el estado de un jugador no es válido.
	 * @param {string} value El estado del jugador.
	 * @throws {InvalidPlayerStatusException} Se lanza si el estado del jugador no es válido.
	 * @protected
	 */
	protected validate(value: string) {
		if (!(value in PlayerStatusConstants)) throw new InvalidPlayerStatusException();
	}
}