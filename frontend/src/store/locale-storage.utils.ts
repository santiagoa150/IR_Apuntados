import {
    LocaleStorageConfig,
    LocaleStorageConfigOf,
    LocaleStorageConstants,
    LocaleStorageDataOf
} from './locale-storage.constants.ts';

/**
 * Clase en dónde se definen los métodos para interactuar con el locale storage.
 * @class
 * @abstract
 */
export abstract class LocaleStorageUtils {

    /**
     * Método que permite eliminar una clave del locale storage.
     * @param {LocaleStorageConstants} key La clave que se desea borrar.
     */
    static del(key: LocaleStorageConstants): void {
        localStorage.removeItem(key);
    }

    /**
     * Método que permite acceder a las claves del locale storage.
     * @param {LocaleStorageConstants} key La clave a la que se quiere acceder.
     * @template T La clave del locale storage.
     * @returns {LocaleStorageDataOf<T> | null}
     */
    static get<T extends LocaleStorageConstants>(key: LocaleStorageConstants): LocaleStorageDataOf<T> | null {
        const config: LocaleStorageConfig = LocaleStorageConfigOf[key];
        const value: string | null = localStorage.getItem(key);
        if (!value) return null;
        if (config && config.isJson) return JSON.parse(value);
        return value as LocaleStorageDataOf<T>;
    }

    /**
     * Método que permite guardar una clave en el locale storage.
     * @template T El tipo de clave que se está guardando.
     * @param {LocaleStorageConstants} key La clave que se está guardando.
     * @param {LocaleStorageDataOf<T>} data Los datos asociados a la clave.
     */
    static set<T extends LocaleStorageConstants>(key: LocaleStorageConstants, data: LocaleStorageDataOf<T>): void {
        const toSave: string = typeof data === 'string' ? data : JSON.stringify(data);
        localStorage.setItem(key,  toSave);
    }
}