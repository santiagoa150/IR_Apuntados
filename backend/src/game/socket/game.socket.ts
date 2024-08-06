import {
	ConnectedSocket,
	OnGatewayConnection,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { GameSocketConstants } from './game.socket.constants';
import { Logger, UseFilters } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameAuthDecorator } from '../../security/game-auth.decorator';
import { GameDecorator } from '../../security/game.decorator';
import { Game, GameDTO } from '../game';
import { AppExceptionFilter } from '../../shared/exceptions/app.exception-filter';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { User, UserDTO } from '../../user/user';
import { Player, PlayerDTO } from '../../player/player';
import { PlayerWithUserDTO } from '../../player/player-with-user.dto';

/**
 * Websocket con socket.io para manejar los eventos de los juegos.
 */
@WebSocketGateway({
	cors: true,
	namespace: GameSocketConstants.GAME_SOCKET_NAMESPACE,
})
export class GameSocket implements OnGatewayInit, OnGatewayConnection {

	@WebSocketServer() wsServer: Server;
	private readonly logger: Logger = new Logger(GameSocket.name);

	/**
	 * Método que captura el mensaje GameSocketConstants.GAME_VALIDATE_CONNECTION en dónde
	 * se conecta a un usuario a la room de los juegos.
	 * @param user El usuario que ingresa al juego.
	 * @param game El juego al que se conecta.
	 * @param socket El cliente conectado.
	 */
	@SubscribeMessage(GameSocketConstants.GAME_CONNECTION_EVENT)
	@UseFilters(AppExceptionFilter)
	@GameAuthDecorator()
	gameConnection(
		@UserDecorator() user: UserDecoratorType,
		@GameDecorator() game: GameDTO,
		@ConnectedSocket() socket: Socket,
	): void {
		this.logger.log(`[${this.gameConnection.name}] INIT :: user: ${user.userId}, game: ${game.gameId}, socket: ${socket.id}`);
		socket.join(game.gameId);
		socket.data.gameId = game.gameId;
	}

	/**
	 * Método que notifica que un usuario ingresó a un juego.
	 * @param user El usuario ingresado.
	 * @param player El jugador generado.
	 * @param game El juego al que ingresó.
	 */
	async joinPlayer(user: User, player: Player, game: Game): Promise<void> {
		this.logger.log(`[${this.joinPlayer.name}] INIT :: user: ${user.userId.toString()}, game: ${game.gameId.toString()}`);
		const playerDTO: PlayerDTO = await player.toDTO();
		const userDTO: UserDTO = user.toDTO();
		const args: PlayerWithUserDTO = {
			playerId: playerDTO.playerId,
			userId: userDTO.userId,
			username: userDTO.username,
			icon: userDTO.icon,
			isMarked: false,
			status: playerDTO.status,
			position: playerDTO.position,
			score: playerDTO.score,
			isActive: playerDTO.isActive,
			cardDesignId: userDTO.currentDesignId,
			cardDesignName: userDTO.currentDesignName,
		};
		this.wsServer.to(game.gameId.toString()).emit(GameSocketConstants.JOIN_PLAYER_LISTENER, args);
		this.logger.log(`[${this.joinPlayer.name}] FINISH ::`);
	}

	/**
	 * Método que notifica que un juego está listo para iniciar.
	 * @param game El juego que está listo para iniciar.
	 */
	gameReadyToStart(game: Game): void {
		this.logger.log(`[${this.gameReadyToStart.name}] INIT :: game: ${game.gameId.toString()}`);
		const gameDTO: GameDTO = game.toDTO();
		this.wsServer.to(gameDTO.gameId).emit(GameSocketConstants.GAME_READY_TO_START_LISTENER, gameDTO);
		this.logger.log(`[${this.gameReadyToStart.name}] FINISH ::`);
	}

	/**
	 * Evento que se ejecuta cuando se inicializa el websocket.
	 */
	afterInit(): void {
		this.logger.log(`[${this.afterInit.name}] ${GameSocketConstants.GAME_SOCKET_NAMESPACE} Socket initialized.`);
	}

	/**
	 * Evento que se ejecuta cuando se conecta un websocket.
	 * @param client El cliente conectado.
	 */
	handleConnection(client: Socket): void {
		this.logger.log(`[${this.handleConnection.name}] Socket connected : ${client.id}`);
	}
}