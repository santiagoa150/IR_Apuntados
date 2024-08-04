import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { JoinGameEventHandler } from './join-game/join-game.event-handler';

/**
 * Los eventos relacionados con los procesos de los juegos.
 */
const Events: Type<IEventHandler>[] = [
	JoinGameEventHandler,
];
export default Events;