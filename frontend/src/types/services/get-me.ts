import {UserType} from '../user.type.ts';

/**
 * Definición de la respuesta del servicio para traer la
 * información del usuario.
 */
export type GetMeResponse = {
    success: boolean,
    user: UserType;
}