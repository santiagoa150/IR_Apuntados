import { StatusValueObject } from '../shared/status.value-object';
import { MatchStatusConstants } from './match-status.constants';
import { InvalidMatchStatusException } from './exceptions/invalid-match-status.exception';

/**
 * Clase que representa el estado de una partida.
 * @class
 * @extends {StatusValueObject<MatchStatusConstants>}
 */
export class MatchStatus extends StatusValueObject<MatchStatusConstants> {

	/**
	 * Método que determina si el estado de una partida no es válido.
	 * @param {string} value El estado de la partida.
	 * @throws {InvalidMatchStatusException} Cuando el estado no es válido.
	 * @protected
	 */
	protected validate(value: string): void {
		if (!(value in MatchStatusConstants)) throw new InvalidMatchStatusException();
	}
}