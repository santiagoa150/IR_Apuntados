import { StatusValueObject } from '../shared/status.value-object';
import { GameStatusConstants } from './game-status.constants';
import { InvalidGameStatusException } from './exceptions/invalid-game-status.exception';

/**
 * Clase que representa el estado de un juego.
 * @class
 * @extends {StatusValueObject<GameStatusConstants>}
 */
export class GameStatus extends StatusValueObject<GameStatusConstants> {

	/**
	 * Método que determina si el estado de un juego no es válido.
	 * @param {string} value El estado del juego.
	 * @throws {InvalidGameStatusException} Se lanza si el estado de un juego no es válido.
	 * @protected
	 */
	protected validate(value: string) {
		if (!(value in GameStatusConstants)) throw new InvalidGameStatusException();
	}
}