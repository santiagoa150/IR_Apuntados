import {createBrowserRouter, Navigate} from 'react-router-dom';
import {DefaultPage} from '../pages/default/default.page.tsx';
import {LoginGuard} from './login.guard.tsx';
import {HomePage} from '../pages/home/home.page.tsx';

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
     * Define la ruta por defecto de la aplicación.
     */
    DEFAULT_ROUTE = '/',
    /**
     * Define la ruta del home de la aplicación.
     */
    HOME_ROUTE = '/home'
}

/**
 * Constante que define las rutas de la aplicación y los
 * componentes que renderiza.
 * @const
 */
export const AppRouter = createBrowserRouter([
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