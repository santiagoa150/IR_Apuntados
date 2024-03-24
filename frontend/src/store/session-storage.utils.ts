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
     * Método que permite eliminar una clave del session storage.
     * @param {SessionStorageConstants} key La clave que se desea borrar.
     */
    static del(key: SessionStorageConstants): void {
        sessionStorage.removeItem(key);
    }

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

    /**
     * Método que permite guardar una clave en el session storage.
     * @template T El tipo de clave que se está guardando.
     * @param {SessionStorageConstants} key La clave que se está guardando.
     * @param {SessionStorageDataOf<T>} data Los datos asociados a la clave.
     */
    static set<T extends SessionStorageConstants>(key: SessionStorageConstants, data: SessionStorageDataOf<T>): void {
        const toSave: string = typeof data === 'string' ? data : JSON.stringify(data);
        sessionStorage.setItem(key,  toSave);
    }
}