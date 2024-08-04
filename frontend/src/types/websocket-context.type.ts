import {Socket} from 'socket.io-client';

/**
 * Tipo que representa los datos del contexto del websocket.
 */
export interface WebsocketContextType {
    socket: Socket | undefined;
    connectWebSocket: () => void;
}