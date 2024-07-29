/**
 * Definición de los datos requeridos para actualizar el icono de un usuario.
 */
export type UpdateUserIconRequest = {
    icon: string;
}

/**
 * Definición de la respuesta del servicio que actualiza el icono de un usuario.
 */
export type UpdateUserIconResponse = {
    success: boolean;
}