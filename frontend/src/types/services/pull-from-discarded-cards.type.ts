import {PlayerType} from '../player.type.ts';

/**
 * La respuesta del servicio que permite jalar cartas de las cartas desechadas.
 */
export type PullFromDiscardedCardsResponse = {
    success: boolean;
    player: PlayerType;
    currentDesignName: string;
}