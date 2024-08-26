import {CardType} from './card.type.ts';

/**
 * Definición de los datos de un jugador completo.
 */
export type PlayerType = {
    playerId: string;
    gameId: string;
    userId: string;
    status: string;
    isActive: boolean;
    triedToWin: boolean;
    trips1: [CardType, CardType, CardType];
    trips2: [CardType, CardType, CardType];
    quads: [CardType, CardType, CardType, CardType];
    score: number;
    position: number;
    kicker?: CardType;
}