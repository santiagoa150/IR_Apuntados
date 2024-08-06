import {createBrowserRouter, Navigate} from 'react-router-dom';
import {DefaultPage} from '../pages/default/default.page.tsx';
import {LoginGuard} from './login.guard.tsx';
import {HomePage} from '../pages/home/home.page.tsx';
import {CardDesignPage} from '../pages/card-design/card-design.page.tsx';
import {WaitingGamePage} from '../pages/waiting-game/waiting-game.page.tsx';
import {GameGuard} from './game.guard.tsx';

/**
 * Constantes que definen las rutas de la aplicación.
 * @enum {string}
 * @readonly
 */
export enum RoutesConstants {
    /**
     * Define todas las rutas desconocidas de la aplicación.
     */
    ALL_ROUTES = '*',
    /**
     * Define la ruta para acceder a los diseños de carta.
     */
    CARD_DESIGNS_ROUTE = '/card-designs',
    /**
     * Define la ruta por defecto de la aplicación.
     */
    DEFAULT_ROUTE = '/',
    /**
     * Define la ruta del juego de la aplicación.
     */
    WAITING_GAME_ROUTE = '/game/waiting',
    /**
     * Define la ruta del home de la aplicación.
     */
    HOME_ROUTE = '/home',
    JOIN_GAME = '/game/join'
}

/**
 * Constante que define las rutas de la aplicación y los
 * componentes que renderiza.
 * @const
 */
export const AppRouter = createBrowserRouter([
    {
        path: RoutesConstants.WAITING_GAME_ROUTE,
        element: <GameGuard element={<WaitingGamePage/>}/>
    },
    {
        path: RoutesConstants.CARD_DESIGNS_ROUTE,
        element: <LoginGuard element={<CardDesignPage/>}/>
    },
    {
        path: RoutesConstants.HOME_ROUTE,
        element: <LoginGuard element={<HomePage/>}/>
    },
    {
        path: RoutesConstants.DEFAULT_ROUTE,
        element: <DefaultPage/>
    },
    {
        path: RoutesConstants.ALL_ROUTES,
        element: <Navigate to={RoutesConstants.DEFAULT_ROUTE} replace/>
    }
]);