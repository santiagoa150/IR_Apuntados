/**
 * Define los datos requeridos para refrescar el token del usuario.
 */
export type RefreshTokenRequest = {
    refreshToken: string;
}

/**
 * Define la respuesta del servicio que refresca el token del usuario.
 */
export type RefreshTokenResponse = {
    success: boolean;
    accessToken: string;
}