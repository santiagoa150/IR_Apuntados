/**
 * Constantes que definen la configuración del web socket.
 * @readonly
 */
export enum SocketConstants {
    /**
     * Constante que define el namespace del websocket de los juegos.
     */
    GAME_SOCKET_NAMESPACE = 'game',
    /**
     * Evento para conectarse a un juego.
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
     * El mensaje que indica que una partida fué iniciada.
     */
    MATCH_STARTED_LISTENER = 'MATCH_STARTED_LISTENER',
}