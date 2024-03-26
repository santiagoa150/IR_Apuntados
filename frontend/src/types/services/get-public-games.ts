import {GameType} from '../game.type.ts';

/**
 * Definición de la respuesta para traer los juegos públicos.
 */
export type GetPublicGamesResponse = {
    success: boolean,
    data: Array<GameType>
}