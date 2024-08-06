import {createContext, ReactNode, useContext, useState} from 'react';
import {WebsocketContextType} from '../types/websocket-context.type.ts';
import {io, Socket} from 'socket.io-client';
import {LocaleStorageUtils} from '../store/locale-storage.utils.ts';
import {LocaleStorageConstants} from '../store/locale-storage.constants.ts';
import {SocketConstants} from '../utils/constants/socket.constants.ts';


/**
 * El contexto del websocket.
 */
const WebSocketContext = createContext<WebsocketContextType | undefined>(undefined);

/**
 * Configuración del websocket de la aplicación.
 * @param children El elemento que se debe pindar.
 * @constructor
 */
export const WebsocketProvider = ({children}: { children: ReactNode }) => {

    /**
     * Hook para gestionar el websocket de socket.io
     */
    const [socket, setSocket] = useState<Socket | undefined>(undefined);

    /**
     * Método para conectar el websocket.
     */
    const connect = (): void => {
        const token: string | null = LocaleStorageUtils.get<LocaleStorageConstants.KEY_ACCESS_TOKEN>(LocaleStorageConstants.KEY_ACCESS_TOKEN);
        if (token && !socket) {
            const url: string = `${import.meta.env.VITE_BACKEND_BASE_URL}/${SocketConstants.GAME_SOCKET_NAMESPACE}`;
            const socket = io(url, {
                extraHeaders: {authorization: `Bearer ${token}`},
                autoConnect: false,
                reconnection: true,
            });
            socket.connect();
            socket.on('connect', () => {
                console.log('Socket connected.');
            });
            setSocket(socket);
        }
    };

    return (
        <WebSocketContext.Provider value={{socket, connectWebSocket: connect}}>
            {children}
        </WebSocketContext.Provider>
    );
};

/**
 * Hook para obtener el websocket.
 */
export const useWebSocket = (): WebsocketContextType => {
    const context: WebsocketContextType | undefined = useContext(WebSocketContext);
    if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
    return context;
};