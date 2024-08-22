import {PlayerType} from '../player.type.ts';

/**
 * La respuesta del servicio que permite jalar cartas del mazo.
 */
export type PullFromCardDeckResponse = {
    success: boolean;
    player: PlayerType;
    currentDesignName: string;
} 