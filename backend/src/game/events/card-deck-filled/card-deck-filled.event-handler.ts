import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CardDeckFilledEvent } from './card-deck-filled.event';
import { GameSocket } from '../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador de los eventos para indicar que un mazo de cartas fué rellenado.
 */
@EventsHandler(CardDeckFilledEvent)
export class CardDeckFilledEventHandler implements IEventHandler<CardDeckFilledEvent> {
	private readonly logger: Logger = new Logger(CardDeckFilledEventHandler.name);

	/**
	 * @param {GameSocket} socket El socket de eventos de los juegos.
	 */
	constructor(private readonly socket: GameSocket) {}

	/**
	 * Ejecuta el evento.
	 * @param {CardDeckFilledEvent} event El evento en ejecución.
	 */
	handle(event: CardDeckFilledEvent): Promise<void> {
		try {
			return this.socket.cardDeckFilled(event.gameId, event.match);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] ERROR :: ${e.message}`);
		}
	}
}
