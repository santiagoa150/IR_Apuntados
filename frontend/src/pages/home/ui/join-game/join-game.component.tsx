import {JSX, useEffect, useState} from 'react';
import './join-game.component.css';
import {GameType} from '../../../../types/game.type.ts';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {IconButton, ListItem, ListItemText} from '@mui/material';
import {AddCircleOutlined} from '@mui/icons-material';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {GetPublicGamesResponse} from '../../../../types/services/get-public-games.ts';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {Navigate} from 'react-router-dom';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import {JoinGameRequest, JoinGameResponse} from '../../../../types/services/join-game.ts';
import NoMatchesImage from '../../../../assets/images/icons/no-matches.png';

/**
 * Componente que permite ingresar a un juego.
 * @constructor
 */
export function JoinGameComponent(): JSX.Element {

    /**
     * Hook para manejar los juegos de la lista.
     */
    const [games, setGames] = useState<Array<GameType> | undefined>(undefined);
    const [gamesLoading, setGamesLoading] = useState(true);

    /**
     * Hooks para la configuración del componente.
     * Define:
     * - El componente de carga.
     * - El componente de redirección.
     * - El componente de errores.
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Utils para acceder al backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils(
        (message: string) => {
            setLoading(false);
            setErrorMessage(message === 'USER_IS_ALREADY_PLAYING_ERROR' ? message + '_JOINING' : message);
        }
    );

    /**
     * Hook que permite traer la lista de partidas públicas.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const res = await backendUtils.get<GetPublicGamesResponse, never>(
                BackendConstants.GET_PUBLIC_GAMES_URL,
            );
            if (res) {
                setGames(res.data);
                setGamesLoading(false);
            }
        }

        fetchData().then();
    }, []);

    /**
     * Método que permite ingresar a un juego.
     * @param {string} gameId El id del juego.
     */
    const joinGame = async (gameId: string): Promise<void> => {
        setLoading(true);
        const body: JoinGameRequest = {gameId};
        const res = await backendUtils.patch<JoinGameResponse, JoinGameRequest>(
            BackendConstants.JOIN_GAME_URL, body
        );
        if (res) {
            setRedirect(true);
            setLoading(false);
        }
    };

    return (
        <>
            <section
                id='join-game-component-container'
                className='component-container'
            >
                <h1>Partidas públicas</h1>
                {gamesLoading || (!gamesLoading && games && games.length > 0)
                    ? <div id='join-game-component-list-container'>
                        {
                            games ? games.map((game) => {
                                return (
                                    <ListItem
                                        key={game.gameId}
                                        disableGutters
                                        className='join-game-component-list-item'
                                        secondaryAction={
                                            <IconButton aria-label='comment' onClick={() => joinGame(game.gameId)}>
                                                <AddCircleOutlined/>
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={game.name}
                                            secondary={`Apuesta: ${game.betByPlayer} - Jugadores: ${game.currentPlayers}/${game.requiredPlayers}`}
                                        />
                                    </ListItem>
                                );
                            }) : <LocalLoadingComponent loading={true} showBackground={false}/>
                        }
                    </div>
                    : <div id="join-game-component-not-matches-image-container" className='component-container'>
                        <img src={NoMatchesImage} alt=""/>
                    </div>
                }
            </section>
            <GlobalLoadingComponent loading={loading}/>
            <AlertComponent
                type={AlertTypeConstants.ERROR_ALERT}
                rawMessage={errorMessage}
                setRawMessage={setErrorMessage}
            />
            {redirect ? <Navigate to={RoutesConstants.WAITING_GAME_ROUTE}/> : <></>}
        </>
    );
}