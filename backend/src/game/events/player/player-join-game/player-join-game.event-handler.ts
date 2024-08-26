import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlayerJoinGameEvent } from './player-join-game.event';
import { GameSocket } from '../../../socket/game.socket';
import { Logger } from '@nestjs/common';

/**
 * Handler que captura el evento de haber ingresado a un juego.
 */
@EventsHandler(PlayerJoinGameEvent)
export class PlayerJoinGameEventHandler implements IEventHandler<PlayerJoinGameEvent> {

	private readonly logger: Logger = new Logger(PlayerJoinGameEventHandler.name);

	/**
	 * @param socket El socket de eventos de los juegos.
	 */
	constructor(private readonly socket: GameSocket) {
	}

	/**
	 * Ejecuta el evento.
	 * @param event El evento en ejecución.
	 */
	async handle(event: PlayerJoinGameEvent): Promise<void> {
		try {
			await this.socket.joinPlayer(event.user, event.player, event.game);
		} catch (e) {
			this.logger.error(`${this.handle.name} Something went wrong : ${e.message}`);
		}
	}
}