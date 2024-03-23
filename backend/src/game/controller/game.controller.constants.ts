/**
 * @enum {string} Constantes que representan la configuración de los controladores
 * de los usuarios.
 * @readonly
 */
export enum GameControllerConstants {
	/**
	 * Prefijo utilizado para todos los controladores de los juegos.
	 */
	CONTROLLER_PREFIX = 'game',
	/**
	 * Tag que agrupa todos los controladores de los juegos.
	 */
	CONTROLLER_TAG = 'Game',
	/**
	 * Url utilizada para el controlador que trae el detalle del juego actual.
	 */
	GET_CURRENT_GAME_DETAIL_URL = 'current',
	/**
	 * Url utilizada para el controlador que trae todas las partidas públicas.
	 */
	GET_PUBLIC_GAMES_URL = 'public',
	/**
	 * Url utilizada para el controlador que permite ingresar a
	 * un juego.
	 */
	JOIN_GAME_URL = 'join',
}