import {PlayerType} from '../player.type.ts';

/**
 * La respuesta del servicio para obtener el jugador actual de un usuario.
 */
export type GetCurrentPlayerResponse = {
    success: boolean;
    player: PlayerType;
    currentDesignName: string;
}