import { IdValueObject } from '../shared/id.value-object';
import { v4, validate } from 'uuid';
import { InvalidGameIdException } from './exceptions/invalid-game-id.exception';

/**
 * Clase que representa el ID de un juego.
 * @class
 * @extends {IdValueObject}
 */
export class GameId extends IdValueObject {

	/**
	 * Método encargado de generar los IDS de los juegos.
	 * @returns {string} El ID generado.
	 * @static
	 */
	static create(): string {
		return v4();
	}

	/**
	 * Método encargado de validar las características del ID de un juego.
	 * @param {string} value El ID para validar.
	 * @throws {InvalidUserIdException} En caso de que el ID no sea válido se lanza la excepción.
	 * @protected
	 */
	protected validate(value: string): void {
		if (!validate(value)) throw new InvalidGameIdException();
	}
}