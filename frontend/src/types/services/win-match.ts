import {CardType} from '../card.type.ts';
import {PlayerType} from '../player.type.ts';

/**
 * Los datos necesarios para ganar una partida.
 */
export type WinMatchRequest = {
    trips1: [CardType, CardType, CardType];
    trips2: [CardType, CardType, CardType];
    quads: [CardType, CardType, CardType, CardType];
    kicker: CardType;
}

/**
 * Los datos en la respuesta después de saber si se puede ganar la partida.
 */
export type WinMatchResponse = {
    success: boolean;
    canWin: boolean;
    player: PlayerType;
}