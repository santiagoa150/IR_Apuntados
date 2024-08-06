import {JSX, useEffect, useState} from 'react';
import {LocalLoadingComponent} from '../../components/loading/local/local-loading.component.tsx';
import {Navigate} from 'react-router-dom';
import {LocaleStorageConstants} from '../../store/locale-storage.constants.ts';
import {LocaleStorageUtils} from '../../store/locale-storage.utils.ts';
import {RoutesConstants} from '../../config/app.router.tsx';
import {BackendUtils} from '../../utils/backend.utils.tsx';
import {JoinGameRequest, JoinGameResponse} from '../../types/services/join-game.ts';
import {BackendConstants} from '../../utils/constants/backend.constants.ts';

/**
 * Página para poder ingresar y redireccionar a un juego.
 * @constructor
 */
export function JoinGamePage(): JSX.Element {

    /**
     * Hooks para la configuración de la redirección.
     */
    const [redirect, setRedirect] = useState<boolean>(false);
    const [redirectRoute, setRedirectRoute] = useState<string | undefined>();

    /**
     * Función que permite redireccionar.
     * @param to La ruta a la que se debe redireccionar.
     */
    const redirectFunction = (to: string): void => {
        setRedirectRoute(to);
        setRedirect(true);
    };

    /**
     * Lógica encargada de la redirección.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const key: LocaleStorageConstants = LocaleStorageConstants.KEY_ACCESS_TOKEN;
            const data: string | null = LocaleStorageUtils.get<typeof key>(key);
            const gameId: string | null = new URLSearchParams(window.location.search).get('gameId');
            if (data && gameId) {
                const backendUtils: BackendUtils = new BackendUtils(
                    () => redirectFunction(RoutesConstants.HOME_ROUTE)
                );
                const res = await backendUtils.patch<JoinGameResponse, JoinGameRequest>(
                    BackendConstants.JOIN_GAME_URL, {gameId}
                );
                if (res) {
                    redirectFunction(RoutesConstants.WAITING_GAME_ROUTE);
                } else {
                    redirectFunction(RoutesConstants.HOME_ROUTE);
                }
            } else {
                const extra: string = gameId ? `?redirect=${RoutesConstants.JOIN_GAME}?gameId=${gameId}` : '';
                redirectFunction(`${RoutesConstants.DEFAULT_ROUTE}${extra}`);
            }
        }

        fetchData().then();

    }, []);


    return (
        <>
            <LocalLoadingComponent loading={true} showBackground={false}/>
            {redirect && redirectRoute ? <Navigate to={redirectRoute}/> : <></>}
        </>
    );
}