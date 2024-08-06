import {MatchType} from '../match.type.ts';

/**
 * Definición de los datos en la respuesta del servicio para iniciar una partida.
 */
export type StartMatchResponse = {
    success: boolean;
    data: MatchType;
}