import {UserType} from '../user.type.ts';

/**
 * Definición de los datos requeridos para actualizar el diseño
 * de carta del usuario.
 */
export type UpdateUserCardDesignRequest = {
    cardDesignId: string
}

/**
 * Definición de la respuesta del servicio que actualiza el diseño de carta del usuario.
 */
export type UpdateUserCardDesignResponse = {
    success: boolean;
    user: UserType;
}