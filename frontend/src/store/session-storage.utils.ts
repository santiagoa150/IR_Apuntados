import {
    SessionStorageConfig,
    SessionStorageConfigOf,
    SessionStorageConstants,
    SessionStorageDataOf
} from './session-storage.constants.ts';

/**
 * Clase en dónde se definen los métodos para interactuar con el
 * session storage.
 * @class
 * @abstract
 */
export abstract class SessionStorageUtils {

    /**
     * Método que permite acceder a las claves del session storage.
     * @param {SessionStorageConstants} key La clave a la que se quiere acceder.
     * @template T La clave del session storage.
     * @returns {SessionStorageDataOf<T> | null}
     */
    static get<T extends SessionStorageConstants>(key: SessionStorageConstants): SessionStorageDataOf<T> | null {
        const config: SessionStorageConfig = SessionStorageConfigOf[key];
        const value: string | null = sessionStorage.getItem(key);
        if (!value) return null;
        if (config && config.isJson) return JSON.parse(value);
        return value as SessionStorageDataOf<T>;
    }
}