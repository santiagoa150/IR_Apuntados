/**
 * Constantes en dónde se definen las claves que se almacenan en
 * el locale storage.
 * @enum {string}
 * @readonly
 */
export enum LocaleStorageConstants {
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
 * Constantes que representa las respuestas que debe retornar el locale storage
 * al acceder a sus claves.
 * @const {Record<LocaleStorageConstants, LocaleStorageConfig>}
 */
export const LocaleStorageConfigOf: Record<LocaleStorageConstants, LocaleStorageConfig> = {
    [LocaleStorageConstants.KEY_ACCESS_TOKEN]: {isJson: false},
    [LocaleStorageConstants.KEY_REFRESH_TOKEN]: {isJson: false},
};

/**
 * Constantes que representa la configuración de las claves del locale storage.
 */
export type LocaleStorageConfig = {
    isJson: boolean;
};

/**
 * Define los tipos de los datos que contienen las claves del locale storage.
 */
export type LocaleStorageData = {
    [LocaleStorageConstants.KEY_REFRESH_TOKEN]: string,
    [LocaleStorageConstants.KEY_ACCESS_TOKEN]: string,
};

/**
 * Define el tipo de un solo dato de una clave del locale storage.
 * @template T La clave de locale storage.
 * @type {LocaleStorageData[T]}
 */
export type LocaleStorageDataOf<T extends LocaleStorageConstants> = LocaleStorageData[T];
