/**
 * @enum {string} Constantes que representan la configuración de
 * los controladores de las sesiones.
 * @readonly
 */
export enum SessionControllerConstants {
	/**
	 * Prefijo utilizado para todos los controladores de la sesión de la aplicación.
	 */
	CONTROLLER_PREFIX = 'session',
	/**
	 * Tag que agrupa todos los controladores de las sesiones de la aplicación.
	 */
	CONTROLLER_TAG = 'Session',
	/**
	 * Url utilizada para el controlador del login.
	 */
	LOGIN_URL = 'login',
	/**
	 * Url utilizada para el controlador que refresca el token del usuario.
	 */
	REFRESH_TOKEN_URL = 'refresh-token',
}