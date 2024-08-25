import { IdValueObject } from '../shared/id.value-object';
import { v4, validate } from 'uuid';
import { InvalidPlayerIdException } from './exceptions/invalid-player-id.exception';

/**
 * Clase que representa el ID de un jugador.
 * @class
 * @extends {IdValueObject}
 */
export class PlayerId extends IdValueObject {

	/**
	 * Función encargada de generar los IDS de los jugadores.
	 * @returns {string} El ID generado.
	 * @static
	 */
	static create(): string {
		return v4();
	}

	/**
	 * Función encargada de validar las características del ID
	 * de un jugador.
	 * @param {string} value El ID para validar.
	 * @protected
	 * @throws {InvalidPlayerIdException} En caso de que el ID no sea válido se lanza la excepción.
	 */
	protected validate(value: string): void {
		if (!validate(value)) throw new InvalidPlayerIdException();
	}
}