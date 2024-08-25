import { IEvent } from '@nestjs/cqrs';
import { GameId } from '../../game-id';
import { Match } from '../../../match/match';

/**
 * Evento que notifica que uan carta ha sido jalada desde las cartas desechadas.
 */
export class CardPulledFromDiscardedEvent implements IEvent {
	constructor(
		public readonly gameId: GameId,
		public readonly match: Match,
	) {}
}
