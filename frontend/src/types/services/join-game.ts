import {GameType} from '../game.type.ts';

/**
 * Definición de los datos requeridos para ingresar a un juego.
 */
export type JoinGameRequest = {
    'gameId': string;
}

/**
 * Definición de la respuesta del servicio para ingresar a un juego.
 */
export type JoinGameResponse = {
    'success': boolean;
    'data': GameType;
}