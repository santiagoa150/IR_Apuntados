/**
 * @enum {string} Constantes que representan los estados de una partida.
 * @readonly
 */
export enum MatchStatusConstants {
	/**
	 * El estado que representa cuando se está jugando una partida.
	 */
	PLAYING = 'PLAYING',
	/**
	 * El estado que representa cuando se está tocando en una partida.
	 */
	TOUCHING = 'TOUCHING',
	/**
	 * El estado que representa que se están calculando los resultados de una partida.
	 */
	CALCULATING_RESULTS = 'CALCULATING_RESULTS',
	/**
	 * El estado que representa cuando se están mostrando los resultados de una partida.
	 */
	SHOWING_RESULTS = 'SHOWING_RESULTS',
	/**
	 * El estado que representa cuando la partida está finalizada.
	 */
	FINISHED = 'FINISHED',
}