/**
 * @enum {string} Constantes que representan los estados de un juego.
 * @readonly
 */
export enum GameStatusConstants {
	/**
	 * El estado representa cuando un juego está activo.
	 */
	ACTIVE = 'ACTIVE',
	/**
	 * El estado representa cuando un juego está finalizado.
	 */
	FINISHED = 'FINISHED',
	/**
	 * El estado representa cuando se están mostrando los resultados
	 * de una partida.
	 */
	SHOWING_MATCH_RESULTS = 'SHOWING_MATCH_RESULTS',
	/**
	 * El estado representa cuando se están mostrando los resultados
	 * de un juego.
	 */
	SHOWING_GAME_RESULTS = 'SHOWING_GAME_RESULTS',
	/**
	 * El estado representa cuando se están esperando los juegos
	 * para un juego.
	 */
	WAITING_PLAYERS = 'WAITING_PLAYERS',
}