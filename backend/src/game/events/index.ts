import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { PlayerJoinGameEventHandler } from './player/player-join-game/player-join-game.event-handler';
import { GameReadyToStartEventHandler } from './game-ready-to-start/game-ready-to-start.event-handler';
import { MatchStartedEventHandler } from './match/match-started/match-started.event-handler';
import { MatchShiftChangedEventHandler } from './match/match-shift-changed/match-shift-changed.event-handler';
import { CardDeckFilledEventHandler } from './card/card-deck-filled/card-deck-filled.event-handler';
import {
	CardPulledFromDiscardedEventHandler,
} from './card/card-pulled-from-discarded/card-pulled-from-discarded.event-handler';
import { PlayerCantWinEventHandler } from './player/player-cant-win/player-cant-win.event-handler';
import { MatchWonEventHandler } from './match/match-won/match-won.event-handler';

/**
 * Los eventos relacionados con los procesos de los juegos.
 */
const Events: Type<IEventHandler>[] = [
	PlayerJoinGameEventHandler,
	GameReadyToStartEventHandler,
	MatchStartedEventHandler,
	MatchShiftChangedEventHandler,
	CardDeckFilledEventHandler,
	CardPulledFromDiscardedEventHandler,
	PlayerCantWinEventHandler,
	MatchWonEventHandler,
];
export default Events;
