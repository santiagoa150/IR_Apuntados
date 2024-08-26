import './game.page.css';
import {JSX, useEffect, useState} from 'react';
import {useWebSocket} from '../../config/websocket.provider.tsx';
import {SocketConstants} from '../../utils/constants/socket.constants.ts';
import {GetCurrentGameDetailResponse} from '../../types/services/get-current-game-detail.ts';
import {BackendConstants} from '../../utils/constants/backend.constants.ts';
import {BackendUtils} from '../../utils/backend.utils.tsx';
import {GameType} from '../../types/game.type.ts';
import {PlayerWithUserType} from '../../types/player-with-user.type.ts';
import {GamePlayersListComponent} from './ui/game-players-list/game-players-list.component.tsx';
import {DiscardedCardsType} from '../../types/discarded-cards.type.ts';
import {GameBoardComponent} from './ui/game-board/game-board.component.tsx';
import {PlayerType} from '../../types/player.type.ts';
import {Navigate} from 'react-router-dom';
import {RoutesConstants} from '../../config/app.router.tsx';

/**
 * Página para jugar un juego.
 * @constructor
 */
export function GamePage(): JSX.Element {

    const [currentPlayer, setCurrentPlayer] = useState<PlayerType | undefined>();

    /**
     * Configuración de los websockets.
     */
    const {socket, connectWebSocket} = useWebSocket();
    useEffect(() => {
        if (!socket) connectWebSocket();
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.emit(SocketConstants.GAME_CONNECTION_EVENT);
            socket.on(SocketConstants.SHIFT_CHANGED_LISTENER, async (data: { player: PlayerType }) => {
                const backendUtils: BackendUtils = new BackendUtils();
                const res = await backendUtils.get<GetCurrentGameDetailResponse, never>(BackendConstants.GET_CURRENT_GAME_URL);
                if (res) {
                    setGame(res.game);
                    setPlayers(res.players);
                    setDiscardedCards(res.discardedCards);
                }
                setCurrentPlayer(data.player);
            });
            socket.on(SocketConstants.CARD_DECK_FILLED_LISTENER, ({discardedCards}: {
                discardedCards: DiscardedCardsType
            }) => {
                setDiscardedCards(discardedCards);
            });
            socket.on(SocketConstants.CARD_PULLED_FROM_DISCARDED_LISTENER, ({discardedCards}: {
                discardedCards: DiscardedCardsType
            }) => {
                setDiscardedCards(discardedCards);
            });
            socket.on(SocketConstants.PLAYER_CANT_WIN_LISTENER, async () => {
                const backendUtils: BackendUtils = new BackendUtils();
                const res = await backendUtils.get<GetCurrentGameDetailResponse, never>(BackendConstants.GET_CURRENT_GAME_URL);
                if (res) {
                    setGame(res.game);
                    setPlayers(res.players);
                    setDiscardedCards(res.discardedCards);
                }
            });
            socket.on(SocketConstants.MATCH_WON_LISTENER, async () => {
                setRedirect(true);
            });
        }
    }, [socket]);

    /**
     * Hooks para el funcionamiento de la página.
     */
    const [game, setGame] = useState<GameType | undefined>();
    const [players, setPlayers] = useState<PlayerWithUserType[] | undefined>();
    const [discardedCards, setDiscardedCards] = useState<DiscardedCardsType | undefined>();

    /**
     * Hook que consume el backend para traer el juego actual del usuario.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const backendUtils: BackendUtils = new BackendUtils();
            const res = await backendUtils.get<GetCurrentGameDetailResponse, never>(BackendConstants.GET_CURRENT_GAME_URL);
            if (res) {
                setGame(res.game);
                setPlayers(res.players);
                setDiscardedCards(res.discardedCards);
            }
        }

        fetchData().then();
    }, []);

    /**
     * Hooks para el funcionamiento del componente
     */
    const [redirect, setRedirect] = useState<boolean>(false);

    return (
        <>
            <div className='page-container' id='game-page-container'>
                <GamePlayersListComponent players={players} game={game}/>
                <GameBoardComponent
                    discardedCards={discardedCards}
                    setDiscardedCards={setDiscardedCards}
                    currentPlayer={currentPlayer}
                />
            </div>
            {redirect ? <Navigate to={RoutesConstants.SHOW_MATCH_WINNER}/> : <></>}
        </>
    );
}