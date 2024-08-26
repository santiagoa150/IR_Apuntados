import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlayerCantWinEvent } from './player-cant-win.event';
import { GameSocket } from '../../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador del evento que indica que un jugador no pudo ganar.
 */
@EventsHandler(PlayerCantWinEvent)
export class PlayerCantWinEventHandler implements IEventHandler<PlayerCantWinEvent> {
	private readonly logger: Logger = new Logger(PlayerCantWinEventHandler.name);

	/**
	 * @param {GameSocket} socket El socket de eventos de los juegos.
	 */
	constructor(private readonly socket: GameSocket) {}

	/**
	 * Ejecuta el evento.
	 * @param {PlayerCantWinEvent} event El evento en ejecución.
	 */
	handle(event: PlayerCantWinEvent): Promise<void> {
		try {
			return this.socket.playerCantWin(event.gameId, event.player);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] ERROR :: ${e.message}`);
		}
	}
}
