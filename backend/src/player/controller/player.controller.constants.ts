/**
 * @enum {string} Constantes de configuración de los controladores del jugador.
 * @readonly
 */
export enum PlayerControllerConstants {
	/**
	 * Prefijo utilizado para los controladores de los jugadores.
	 */
	CONTROLLER_PREFIX = 'player',
	/**
	 * Tag que agrupa todos los controladores de los juegos.
	 */
	CONTROLLER_TAG = 'Players',
	/**
	 * Url para obtener el jugador actual de un usuario.
	 */
	GET_CURRENT_PLAYER_URL = 'current',
	/**
	 * Url del servicio para que un jugador pase el turno.
	 */
	PASS_SHIFT_URL = 'pass-shift',
}