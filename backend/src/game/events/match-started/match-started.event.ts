import { Game } from '../../game';
import { Match } from '../../../match/match';

/**
 * Evento para indicar que una partida ha sido iniciada.
 */
export class MatchStartedEvent {

	/**
	 * @param game El juego al que pertenece la partida.
	 * @param match La partida iniciada.
	 */
	constructor(
		public readonly game: Game,
		public readonly match: Match,
	) {
	}
}