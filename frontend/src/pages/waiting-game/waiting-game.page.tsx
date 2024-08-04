import {JSX, useEffect, useState} from 'react';
import './waiting-game.page.css';
import {BackendUtils} from '../../utils/backend.utils.tsx';
import {AlertTypeConstants} from '../../utils/constants/alert.constants.ts';
import {AlertComponent} from '../../components/alert/alert.component.tsx';
import {GetCurrentGameDetailResponse} from '../../types/services/get-current-game-detail.ts';
import {BackendConstants} from '../../utils/constants/backend.constants.ts';
import {GameType} from '../../types/game.type.ts';
import {PlayerWithUserType} from '../../types/player-with-user.type.ts';
import {WaitingPlayerListComponent} from './ui/waiting-player-list/waiting-player-list.component.tsx';
import {WaitingGameActionsComponent} from './ui/waiting-game-actions/waiting-game-actions.component.tsx';
import {WaitingGameInfoComponent} from './ui/waiting-game-info/waiting-game-info.component.tsx';
import {useWebSocket} from '../../config/websocket.provider.tsx';
import {SocketConstants} from '../../utils/constants/socket.constants.ts';

/**
 * Página para esperar un juego.
 * @constructor
 */
export function WaitingGamePage(): JSX.Element {

    const [game, setGame] = useState<GameType | undefined>();
    const [players, setPlayers] = useState<PlayerWithUserType[] | undefined>();

    const {socket, connectWebSocket} = useWebSocket();

    useEffect(() => {
        if (!socket) connectWebSocket();
    }, []);
    if (socket) {
        socket.emit(SocketConstants.GAME_CONNECTION_EVENT);
        socket.on(SocketConstants.JOIN_PLAYER_LISTENER, (newPlayer: PlayerWithUserType) => {
            setPlayers(players ? [...players, newPlayer] : [newPlayer]);
        });
    }

    /**
     * Hooks para la configuración del componente:
     * - La configuración para los componentes de alertas.
     */
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Utils para acceder al backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils(
        (message: string) => {
            setErrorMessage(message);
        }
    );

    /**
     * Hook que consume el backend para traer el juego actual del usuario.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const res = await backendUtils.get<GetCurrentGameDetailResponse, never>(BackendConstants.GET_CURRENT_GAME_URL);
            if (res) {
                setGame(res.game);
                setPlayers(res.players);
            }
        }

        fetchData().then();
    }, []);

    return (
        <>
            <div
                id='waiting-game-page-container'
                className='page-container'
            >
                <div id='waiting-game-page-container-title'>
                    <h1>Sala de espera</h1>
                </div>
                <WaitingGameInfoComponent game={game}/>
                <WaitingPlayerListComponent players={players}/>
                <WaitingGameActionsComponent game={game}/>
            </div>
            <AlertComponent
                type={AlertTypeConstants.ERROR_ALERT}
                rawMessage={errorMessage}
                setRawMessage={setErrorMessage}
            />
        </>
    );
}