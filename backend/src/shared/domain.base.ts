/**
 * Clase que representa los objetos de dominio de la aplicación.
 *
 * @template T El DTO del objeto de dominio.
 * @class
 * @abstract
 */
export abstract class DomainBase<T> {

	protected abstract toDTO(): T | Promise<T>;
}