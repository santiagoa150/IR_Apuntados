/**
 * Constantes que define las urls para acceder a los recursos del
 * backend.
 * @enum {string}
 * @readonly
 */
export enum BackendConstants {
    /**
     * Ruta para acceder al usuario que ejecuta la aplicación.
     */
    GET_ME_URL = '/api/user/me',
    /**
     * Ruta para acceder al login de la aplicación.
     */
    LOGIN_URL = '/api/session/login',
    /**
     * Ruta para acceder al registro de la aplicación.
     */
    REGISTER_URL = '/api/user',
    /**
     * Ruta para acceder al servicio que refresca el token del usuario.
     */
    REFRESH_ACCESS_TOKEN_URL = '/api/session/refresh-token',
}

/**
 * Definición de la configuración para cada servicio del backend
 * @const {Record<BackendConstants, BackendConfigType>}
 */
export const BackendConfigConstants: Record<BackendConstants, BackendConfigType> = {
    [BackendConstants.GET_ME_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.LOGIN_URL]: {
        requireAccessToken: false,
        retryRequest: false,
    },
    [BackendConstants.REGISTER_URL]: {
        requireAccessToken: false,
        retryRequest: false,
    },
    [BackendConstants.REFRESH_ACCESS_TOKEN_URL]: {
        requireAccessToken: false,
        retryRequest: false,
    }
};

/**
 * Definición de la configuración que debe tener cada servicio del backend.
 */
export type BackendConfigType = {
    requireAccessToken: boolean;
    retryRequest: boolean;
}