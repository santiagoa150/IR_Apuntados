import { IdValueObject } from '../shared/id.value-object';
import { v4, validate } from 'uuid';
import { InvalidMatchIdException } from './exceptions/invalid-match-id.exception';

/**
 * Clase que representa el ID de una partida.
 * @class
 * @extends {IdValueObject}
 */
export class MatchId extends IdValueObject {

	/**
	 * Función encargada de generar los IDS de las partidas.
	 * @returns {string} El ID generado.
	 * @static
	 */
	static create(): string {
		return v4();
	}

	/**
	 * Función encargada de validar las características del ID de una partida.
	 * @param {string} value El ID para validar.
	 * @throws {InvalidMatchIdException} Cuando el ID enviado no es válido.
	 * @protected
	 */
	protected validate(value: string): void {
		if (!validate(value)) throw new InvalidMatchIdException();
	}
}