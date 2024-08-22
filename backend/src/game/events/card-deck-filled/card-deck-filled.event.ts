import { GameId } from '../../game-id';
import { Match } from '../../../match/match';

/**
 * Evento para indicar que el mazo de cartas fue rellenado.
 */
export class CardDeckFilledEvent {
	/**
	 * @param {GameId} gameId El juego en el que sucedió el cambio.
	 * @param {Match} match La partida en la que se rellenó el mazo.
	 */
	constructor(
		public readonly gameId: GameId,
		public readonly match: Match,
	) {}
}
