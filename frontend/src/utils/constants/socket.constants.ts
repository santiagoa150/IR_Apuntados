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
}