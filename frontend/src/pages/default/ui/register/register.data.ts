/**
 * Definición de los datos requeridos para registrar un usuario.
 */
export type RegisterRequest = {
    username: string;
    password: string;
}

/**
 * Definición de los datos de respuesta para registrar un usuario.
 */
export type RegisterResponse = {
    accessToken: string;
    refreshToken: string;
}