/**
 * Constantes que define las urls para acceder a los recursos del
 * backend.
 * @enum {string}
 * @readonly
 */
export enum BackendConstants {
    /**
     * Ruta para acceder a los diseños de cartas disponibles.
     */
    GET_ACTIVE_CARD_DESIGNS_URL = '/api/card-design/active',
    /**
     * Ruta para acceder al diseño de carta actual del usuario.
     */
    GET_CURRENT_CARD_DESIGN_URL = '/api/card-design/current',
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
    /**
     * Ruta para acceder al servicio que actualiza el diseño de
     * carta de un usuario.
     */
    UPDATE_USER_CARD_DESIGN_URL = '/api/user/card-design'
}

/**
 * Definición de la configuración para cada servicio del backend
 * @const {Record<BackendConstants, BackendConfigType>}
 */
export const BackendConfigConstants: Record<BackendConstants, BackendConfigType> = {
    [BackendConstants.GET_ACTIVE_CARD_DESIGNS_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_CURRENT_CARD_DESIGN_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
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
    },
    [BackendConstants.UPDATE_USER_CARD_DESIGN_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    }
};

/**
 * Definición de la configuración que debe tener cada servicio del backend.
 */
export type BackendConfigType = {
    requireAccessToken: boolean;
    retryRequest: boolean;
}