/**
 * Constantes para definir las configuraciones relacionadas con los sockets.ñ
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
}