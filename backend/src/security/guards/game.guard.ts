import { CanActivate, ContextType, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/game';
import { UserIsNotPartOfAGameException } from '../../user/exceptions/user-is-not-part-of-a-game.exception';
import { Socket } from 'socket.io';
import { UserDecoratorType } from '../user.decorator';
import { UserId } from '../../user/user-id';

/**
 * Clase que contiene los métodos para la guardia de los juegos.
 * @class
 * @implements CanActivate
 */
@Injectable()
export class GameGuard implements CanActivate {

	private readonly logger: Logger = new Logger(GameGuard.name);

	/**
	 * @param {GameService} gameService Los servicios para interactuar con los juegos.
	 */
	constructor(private readonly gameService: GameService) {
	}

	/**
	 * Método que define la lógica para la guardia de los juegos.
	 * @param {ExecutionContext} context El contexto en el que se ejecuta la guardia.
	 * @returns {boolean} Siempre se retorna true cuando se pueden acceder a los recursos del juego.
	 * @throws {UserIsNotPartOfAGameException} Se lanza cuando un usuario no tiene
	 * acceso a los recursos del juego.
	 */
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			switch (context.getType<ContextType>()) {
			case 'http': {
				const request = context.switchToHttp().getRequest();
				const user: UserDecoratorType = request.user;
				const game: Game = await this.gameService.getNotFinishedByPlayer(new UserId(user.userId));
				request.game = game.toDTO();
				break;
			}
			case 'ws': {
				const socket: Socket = context.switchToWs().getClient();
				const user: UserDecoratorType = JSON.parse(socket.handshake.query.user as string);
				const game: Game = await this.gameService.getNotFinishedByPlayer(new UserId(user.userId));
				socket.handshake.query.game = JSON.stringify(game.toDTO());
			}
			}
			return true;
		} catch (e) {
			this.logger.error(`[${this.canActivate.name}] Error :: ${e.message}`);
			throw new UserIsNotPartOfAGameException();
		}
	}

}