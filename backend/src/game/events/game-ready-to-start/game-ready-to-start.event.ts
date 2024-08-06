import { Game } from '../../game';

/**
 * Evento para indicar que un juego está listo para ser iniciado.
 */
export class GameReadyToStartEvent {

	/**
	 * @param game El juego que está listo para iniciarse.
	 */
	constructor(public readonly game: Game) {
	}
}