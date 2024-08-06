import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameReadyToStartEvent } from './game-ready-to-start.event';
import { GameSocket } from '../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador de eventos para indicar que un juego ya está listo para ser iniciado.
 */
@EventsHandler(GameReadyToStartEvent)
export class GameReadyToStartEventHandler implements IEventHandler<GameReadyToStartEvent> {

	private readonly logger: Logger = new Logger(GameReadyToStartEventHandler.name);

	/**
	 * @param socket El websocket de eventos de los juegos.
	 */
	constructor(private readonly socket: GameSocket) {
	}

	/**
	 * Ejecuta el evento.
	 * @param event El evento en ejecución.
	 */
	handle(event: GameReadyToStartEvent) {
		try {
			this.socket.gameReadyToStart(event.game);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] ERROR :: ${e.message}`);
		}
	}
}