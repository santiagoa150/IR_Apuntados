/**
 * @enum {string} Constantes que representan la configuración de
 * los controladores de los usuarios.
 * @readonly
 */
export enum UserControllerConstants {
	/**
	 * Prefijo utilizado para todos los controladores de los usuarios.
	 */
	CONTROLLER_PREFIX = 'user',
	/**
	 * Tag que agrupa todos los controladores de los usuarios.
	 */
	CONTROLLER_TAG = 'User',
	/**
	 * Url utilizada para el controlador que retorna al usuario.
	 */
	GET_ME_URL = 'me',
	/**
	 * Url utilizada para el controlador que actualiza el diseño
	 * de carta del usuario.
	 */
	UPDATE_USER_CARD_DESIGN_URL = 'card-design',
}