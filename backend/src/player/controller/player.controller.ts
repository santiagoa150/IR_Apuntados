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
import { Game, GameDTO } from '../../game/game';
import { PassShiftCard, PassShiftControllerRequest } from './requests/pass-shift.controller.request';
import { Card } from '../../card/card';
import { CardValueConstants } from '../../card/card-value.constants';
import { Trips } from '../../card/trips';
import { Quads } from '../../card/quads';
import { Match } from '../../match/match';
import { MatchService } from '../../match/match.service';
import { EventBus } from '@nestjs/cqrs';
import { ShiftChangedEvent } from '../../game/events/shift-changed/shift-changed.event';
import { CardWithDesign } from '../../card/card-with-design';
import { MatchId } from '../../match/match-id';
import { GameId } from '../../game/game-id';
import { CardDeckFilledEvent } from '../../game/events/card-deck-filled/card-deck-filled.event';

/**
 * El controlador de los jugadores.
 */
@Controller(PlayerControllerConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerControllerConstants.CONTROLLER_TAG)
export class PlayerController {
	/**
	 * @param {UserService} userService Los servicios de los usuarios.
	 * @param {PlayerService} playerService Los servicios de los jugadores.
	 * @param {MatchService} matchService Los servicios para acceder a los procesos de las partidas.
	 * @param {EventBus} eventBus El bus de eventos para ejecutar con CQRS.
	 */
	constructor(
		private readonly userService: UserService,
		private readonly playerService: PlayerService,
		private readonly matchService: MatchService,
		private readonly eventBus: EventBus,
	) {}

	/**
	 * Punto de entrada GET para obtener el jugador actual de un usuario.
	 * @param {UserDecoratorType} user El usuario que consume el servicio.
	 * @returns {PlayerControllerResponse} El jugador actual.
	 */
	@Get(PlayerControllerConstants.GET_CURRENT_PLAYER_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: PlayerControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async getCurrentPlayer(@UserDecorator() user: UserDecoratorType): Promise<PlayerControllerResponse> {
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
	 * @param {UserDecoratorType} userDecorator El usuario que ejecuta el servicio.
	 * @param {GameDTO} gameDTO El juego en el que se está pasando el turno.
	 * @returns {PlayerControllerResponse} La respuesta genérica de los controladores de los jugadores.
	 */
	@Patch(PlayerControllerConstants.PASS_SHIFT_URL)
	@GameAuthDecorator()
	@ApiOkResponse({ type: PlayerControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async passShift(
		@Body() body: PassShiftControllerRequest,
		@UserDecorator() userDecorator: UserDecoratorType,
		@GameDecorator() gameDTO: GameDTO,
	): Promise<PlayerControllerResponse> {
		const response: PlayerControllerResponse = new PlayerControllerResponse();
		const mapper = (c: PassShiftCard) =>
			Card.fromDTO({
				suit: c.suit,
				type: c.type,
				value: CardValueConstants[c.type],
			});
		const game: Game = Game.fromDTO(gameDTO);
		const match: Match = await this.matchService.getById(game.currentMatch);
		const user: User = await this.userService.getById(new UserId(userDecorator.userId));
		const data = await this.playerService.passShift(
			user.userId,
			game,
			match,
			body.trips1.map((c) => mapper(c)) as Trips,
			body.trips2.map((c) => mapper(c)) as Trips,
			body.quads.map((c) => mapper(c)) as Quads,
			mapper(body.kicker),
		);
		const kickerWithDesign = CardWithDesign.fromDTO({
			cardDesignId: user.currentDesignId.toString(),
			cardDesignName: user.currentDesignName,
			suit: body.kicker.suit,
			type: body.kicker.type,
			value: CardValueConstants[body.kicker.type],
		});
		const updatedMatch: Match = await this.matchService.passShift(match, kickerWithDesign, data.player);
		this.eventBus.publish(new ShiftChangedEvent(game, updatedMatch, data.nextPlayer));
		response.player = await data.player.toDTO();
		response.currentDesignName = user.currentDesignName;
		return response;
	}

	/**
	 * Punto de entrada PATCH que permite jalar una carta del mazo.
	 * @param {UserDecoratorType} userDecorator El usuario que está jalando la carta.
	 * @param {GameDTO} game El juego en el que se está jalando la carta.
	 * @returns {PlayerControllerResponse} La respuesta genérica de los controladores de los jugadores.
	 */
	@Patch(PlayerControllerConstants.PULL_FROM_CARD_DECK)
	@GameAuthDecorator()
	@ApiOkResponse({ type: PlayerControllerResponse })
	@ApiResponse({ type: ExceptionResponseDTO })
	async pullFromCardDeck(
		@UserDecorator() userDecorator: UserDecoratorType,
		@GameDecorator() game: GameDTO,
	): Promise<PlayerControllerResponse> {
		const response: PlayerControllerResponse = new PlayerControllerResponse();
		const gameId: GameId = new GameId(game.gameId);
		const match: Match = await this.matchService.getById(new MatchId(game.currentMatch));
		const user: User = await this.userService.getById(new UserId(userDecorator.userId));
		const data = await this.playerService.pullFromCardDeck(user.userId, gameId, match);
		await this.matchService.update(match);
		if (data.filledDeck) this.eventBus.publish(new CardDeckFilledEvent(gameId, match));
		response.player = await data.player.toDTO();
		response.currentDesignName = user.currentDesignName.toString();
		return response;
	}
}
