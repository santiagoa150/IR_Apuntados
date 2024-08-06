import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { JoinGameEventHandler } from './join-game/join-game.event-handler';
import { GameReadyToStartEventHandler } from './game-ready-to-start/game-ready-to-start.event-handler';
import { MatchStartedEventHandler } from './match-started/match-started.event-handler';

/**
 * Los eventos relacionados con los procesos de los juegos.
 */
const Events: Type<IEventHandler>[] = [
	JoinGameEventHandler,
	GameReadyToStartEventHandler,
	MatchStartedEventHandler,
];
export default Events;