import {DiscardedCardsType} from './discarded-cards.type.ts';
import {CardDeckType} from './card-deck.type.ts';

/**
 * Definición de los datos de las partidas.
 */
export type MatchType = {
    gameId: string;
    matchId: string;
    initialPlayers: number;
    currentPlayers: number;
    currentShift: number;
    totalShifts: number;
    status: string;
    discardedCards: DiscardedCardsType;
    cardDeck: CardDeckType;
}