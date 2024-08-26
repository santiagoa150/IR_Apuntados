/**
 * Constantes para definir las configuraciones relacionadas con los sockets.
 */
export enum GameSocketConstants {
	/**
	 * El namespace del socket de los juegos.
	 */
	GAME_SOCKET_NAMESPACE = 'game',
	/**
	 * El mensaje que válida la conexión de un usuario.
	 */
	GAME_CONNECTION_EVENT = 'GAME_CONNECTION_EVENT',
	/**
	 * El mensaje que indica que un usuario ingresó a un juego.
	 */
	JOIN_PLAYER_LISTENER = 'JOIN_PLAYER_LISTENER',
	/**
	 * El mensaje que indica que un juego está listo para iniciarse.
	 */
	GAME_READY_TO_START_LISTENER = 'GAME_READY_TO_START_LISTENER',
	/**
	 * El mensaje que indica que una partida fue iniciada.
	 */
	MATCH_STARTED_LISTENER = 'MATCH_STARTED_LISTENER',
	/**
	 * El mensaje que indica que un turno ha cambiado.
	 */
	SHIFT_CHANGED_LISTENER = 'SHIFT_CHANGED_LISTENER',
	/**
	 * El mensaje que indica que un mazo de cartas fue rellenado.
	 */
	CARD_DECK_FILLED_LISTENER = 'CARD_DECK_FILLED_LISTENER',
	/**
	 * El mensaje que indica que una carta fue jalada desde las cartas desechadas.
	 */
	CARD_PULLED_FROM_DISCARDED_LISTENER = 'CARD_PULLED_FROM_DISCARDED_LISTENER',
	/**
	 * El mensaje que indica que un jugador no pudo ganar.
	 */
	PLAYER_CANT_WIN_LISTENER = 'PLAYER_CANT_WIN_LISTENER',
	/**
	 * El mensaje que indica que una partida ha sido ganada.
	 */
	MATCH_WON_LISTENER = 'MATCH_WON_LISTENER'
}
