import {CardType} from '../card.type.ts';
import {PlayerType} from '../player.type.ts';

/**
 * Los datos necesarios para pasar un turno.
 */
export type PassShiftRequest = {
    trips1: [CardType, CardType, CardType];
    trips2: [CardType, CardType, CardType];
    quads: [CardType, CardType, CardType, CardType];
    kicker: CardType;
}

/**
 * Los datos en la respuesta después de haber pasado un turno.
 */
export type PassShiftResponse = {
    success: boolean;
    player: PlayerType;
    currentDesignName: string;
}