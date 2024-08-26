import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MatchStartedEvent } from './match-started.event';
import { GameSocket } from '../../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador de eventos para indicar que una partida fué iniciada.
 */
@EventsHandler(MatchStartedEvent)
export class MatchStartedEventHandler implements IEventHandler<MatchStartedEvent> {

	private readonly logger: Logger = new Logger(MatchStartedEventHandler.name);

	/**
	 * param gameSocket El websocket de eventos de los juegos.
	 */
	constructor(private readonly gameSocket: GameSocket) {
	}

	/**
	 * Ejecuta el evento.
	 * @param event El evento en ejecución.
	 */
	async handle(event: MatchStartedEvent): Promise<void> {
		try {
			await this.gameSocket.matchStarted(event.game, event.match);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] ERROR :: ${e.message}`);
		}
	}
}