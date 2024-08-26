import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MatchWonEvent } from './match-won.event';
import { GameSocket } from '../../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador del evento que indica que una partida fue ganada.
 */
@EventsHandler(MatchWonEvent)
export class MatchWonEventHandler implements IEventHandler<MatchWonEvent> {
	private readonly logger: Logger = new Logger(MatchWonEventHandler.name);
    
	/**
     * @param {GameSocket} socket El socket de eventos de los juegos.
     */
	constructor(private readonly socket: GameSocket) {
	}

	/**
     * Ejecuta el evento.
     * @param {MatchWonEvent} event El evento en ejecución.
     */
	handle(event: MatchWonEvent): Promise<void> {
		try {
			return this.socket.matchWon(event.game);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] INIT :: e: ${e.message}`);
		}
	}
}