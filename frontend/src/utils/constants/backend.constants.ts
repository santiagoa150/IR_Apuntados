/**
 * Constantes que define las urls para acceder a los recursos del
 * backend.
 * @enum {string}
 * @readonly
 */
export enum BackendConstants {
    /**
     * Ruta para acceder al login de la aplicación.
     */
    LOGIN_URL = '/api/session/login',
}

/**
 * Definición de la configuración para cada servicio del backend
 * @const {Record<BackendConstants, BackendConfigType>}
 */
export const BackendConfigConstants: Record<BackendConstants, BackendConfigType> = {
    [BackendConstants.LOGIN_URL]: {
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