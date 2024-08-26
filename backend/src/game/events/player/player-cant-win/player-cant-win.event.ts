import { IEvent } from '@nestjs/cqrs';
import { GameId } from '../../../game-id';
import { Player } from '../../../../player/player';

/**
 * Evento que indica que un jugador no pudo ganar.
 */
export class PlayerCantWinEvent implements IEvent {
	/**
	 * @param {GameId} gameId El juego en dónde no se pudo ganar.
	 * @param {Player} player El jugador en dónde
	 */
	constructor(
		public readonly gameId: GameId,
		public readonly player: Player,
	) {}
}
