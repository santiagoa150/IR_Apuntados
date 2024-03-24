/**
 * Definición de los datos requeridos para iniciar sesión.
 */
export type LoginRequest = {
    username: string;
    password: string;
}

/**
 * Definición de los datos de respuesta al iniciar sesión.
 */
export type LoginResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}