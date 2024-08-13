import { PlayerService } from '../player.service';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerControllerConstants } from './player.controller.constants';
import { GameAuthDecorator } from '../../security/game-auth.decorator';
import { PlayerControllerResponse } from './responses/player.controller.response';
import { ExceptionResponseDTO } from '../../shared/exceptions/exception.response';
import { Player } from '../player';
import { UserDecorator, UserDecoratorType } from '../../security/user.decorator';
import { UserId } from '../../user/user-id';


import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { GameDecorator } from '../../security/game.decorator';
import { GameDTO } from '../../game/game';
import { GameId } from '../../game/game-id';
import { PassShiftCard, PassShiftControllerRequest } from './requests/pass-shift.controller.request';
import { Card } from '../../card/card';
import { CardValueConstants } from '../../card/card-value.constants';
import { Trips } from '../../card/trips';
import { Quads } from '../../card/quads';

/**
 * El controlador de los jugadores.
 */
@Controller(PlayerControllerConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerControllerConstants.CONTROLLER_TAG)
export class PlayerController {

	/**
	 * @param userService Los servicios de los usuarios.
	 * @param playerService Los servicios de los jugadores.
	 */
	constructor(
		private readonly userService: UserService,
		private readonly playerService: PlayerService,
	) {
	}

	/**
	 * Punto de entrada GET para obtener el jugador actual de un usuario.
	 * @param {UserDecoratorType} user El usuario que consume el servicio.
	 * @returns {PlayerControllerResponse} El jugador actual.
	 */
	@Get(PlayerControllerConstants.GET_CURRENT_PLAYER_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: PlayerControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getCurrentPlayer(
		@UserDecorator() user: UserDecoratorType,
	): Promise<PlayerControllerResponse> {
		const response: PlayerControllerResponse = new PlayerControllerResponse();
		const userId: UserId = new UserId(user.userId);
		const userData: User = await this.userService.getById(userId);
		const player: Player = await this.playerService.getActiveByUserId(userId);
		response.player = await player.toDTO();
		response.currentDesignName = userData.currentDesignName;
		return response;
	}

	/**
	 * Punto de entrada PATCh para pasar el turno en una partida.
	 * @param {PassShiftControllerRequest} body Los argumentos necesarios para el funcionamiento.
	 * @param {UserDecoratorType} user El usuario que ejecuta el servicio.
	 * @param {GameDTO} game El juego en el que se está pasando el turno.
	 * @returns {PlayerControllerResponse} La respuesta genérica de los controladores de los jugadores.
	 */
	@Patch(PlayerControllerConstants.PASS_SHIFT_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: PlayerControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async passShift(
		@Body() body: PassShiftControllerRequest,
		@UserDecorator() user: UserDecoratorType,
		@GameDecorator() game: GameDTO,
	): Promise<PlayerControllerResponse> {
		const response: PlayerControllerResponse = new PlayerControllerResponse();
		const mapper = (c: PassShiftCard) => Card.fromDTO({
			suit: c.suit,
			type: c.type,
			value: CardValueConstants[c.type],
		});
		const updated: Player = await this.playerService.passShift(
			new UserId(user.userId),
			new GameId(game.gameId),
			body.trips1.map(c => mapper(c)) as Trips,
			body.trips2.map(c => mapper(c)) as Trips,
			body.quads.map(c => mapper(c)) as Quads,
			mapper(body.kicker),
		);
		response.player = await updated.toDTO();
		return response;
	}
}