import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CardPulledFromDiscardedEvent } from './card-pulled-from-discarded.event';
import { GameSocket } from '../../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador de eventos para notificar que un evento ha sido jalado desde las cartas desechadas.
 */
@EventsHandler(CardPulledFromDiscardedEvent)
export class CardPulledFromDiscardedEventHandler implements IEventHandler<CardPulledFromDiscardedEvent> {
	private readonly logger: Logger = new Logger(CardPulledFromDiscardedEvent.name);

	/**
	 * @param {GameSocket} socket El socket de eventos de los juegos.
	 */
	constructor(private readonly socket: GameSocket) {}

	/**
	 * Ejecuta el evento.
	 * @param {CardPulledFromDiscardedEvent} event El evento en ejecución.
	 */
	async handle(event: CardPulledFromDiscardedEvent): Promise<void> {
		try {
			return this.socket.cardPulledFromDiscarded(event.gameId, event.match);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] ERROR :: ${e.message}`);
		}
	}
}
