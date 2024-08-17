import { Game } from '../../game';
import { Match } from '../../../match/match';

/**
 * Evento para indicar que una partida ha sido iniciada.
 */
export class MatchStartedEvent {

	/**
	 * @param {Game} game El juego al que pertenece la partida.
	 * @param {Match} match La partida iniciada.
	 */
	constructor(
		public readonly game: Game,
		public readonly match: Match,
	) {
	}
}