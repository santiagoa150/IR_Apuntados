import { Match } from '../../../../match/match';
import { Game } from '../../../game';
import { Player } from '../../../../player/player';

/**
 * Evento para indicar que un turno cambió.
 */
export class MatchShiftChangedEvent {

	/**
	 * @param {Game} game El juego en el que se cambió el turno.
	 * @param {Match} match La partida actualizada.
	 * @param {Player} nextPlayer El siguiente jugador.
	 */
	constructor(
		public readonly game: Game,
		public readonly match: Match,
		public readonly nextPlayer: Player,
	) {
	}
}