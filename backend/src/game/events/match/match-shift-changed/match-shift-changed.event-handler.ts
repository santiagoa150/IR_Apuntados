import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MatchShiftChangedEvent } from './match-shift-changed.event';
import { GameSocket } from '../../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Capturador de eventos para indicar que un turno ha sido cambiado.
 */
@EventsHandler(MatchShiftChangedEvent)
export class MatchShiftChangedEventHandler implements IEventHandler<MatchShiftChangedEvent> {

	private readonly logger: Logger = new Logger(MatchShiftChangedEventHandler.name);

	/**
	 * @param {GameSocket} socket El socket de eventos de los juegos.
	 */
	constructor(private readonly socket: GameSocket) {
	}

	/**
	 * Ejecuta el evento.
	 * @param {MatchShiftChangedEvent} event El evento en ejecución.
	 */
	async handle(event: MatchShiftChangedEvent): Promise<void> {
		try {
			await this.socket.shiftChanged(event.game, event.match, event.nextPlayer);
		} catch (e) {
			this.logger.error(`[${this.handle.name}] ERROR :: ${e.message}`);
		}
	}
}