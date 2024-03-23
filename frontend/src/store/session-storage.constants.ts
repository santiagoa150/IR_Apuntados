/**
 * Constantes en dónde se definen las claves que se almacenan en
 * el session storage.
 * @enum {string}
 * @readonly
 */
export enum SessionStorageConstants {
    /**
     * Clave para acceder al token de acceso del usuario.
     */
    KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN',
    /**
     * Clave para acceder al token de refresco del usuario.
     */
    KEY_REFRESH_TOKEN = 'KEY_REFRESH_TOKEN',
}

/**
 * Constantes que representa las respuestas que debe retornar el session storage
 * al acceder a sus claves.
 * @const {Record<SessionStorageConstants, SessionStorageConfig>}
 */
export const SessionStorageConfigOf: Record<SessionStorageConstants, SessionStorageConfig> = {
    [SessionStorageConstants.KEY_ACCESS_TOKEN]: {isJson: false},
    [SessionStorageConstants.KEY_REFRESH_TOKEN]: {isJson: false},
};

/**
 * Constantes que representa la configuración de las claves del session
 * storage.
 */
export type SessionStorageConfig = {
    isJson: boolean;
};

/**
 * Define los tipos de los datos que contienen las claves del
 * session storage.
 */
export type SessionStorageData = {
    [SessionStorageConstants.KEY_REFRESH_TOKEN]: string,
    [SessionStorageConstants.KEY_ACCESS_TOKEN]: string,
};

/**
 * Define el tipo de un solo dato de una clave del session storage.
 * @template T La clave de session storage.
 * @type {SessionStorageData[T]}
 */
export type SessionStorageDataOf<T extends SessionStorageConstants> = SessionStorageData[T];
