import React from 'react';
import {SessionStorageUtils} from '../store/session-storage.utils.ts';
import {SessionStorageConstants} from '../store/session-storage.constants.ts';
import {Navigate, useLocation} from 'react-router-dom';
import {RoutesConstants} from './app.router.tsx';

/**
 * Guardia de la aplicación para las páginas que requieren acceso al aplicativo.
 * @param element La página que se renderiza en caso de que se pueda acceder.
 * @returns {React.ReactNode} La página que se renderizará.
 * @constructor
 */
export const LoginGuard = ({element}: { element: React.ReactNode }): React.ReactNode => {
    const key: SessionStorageConstants = SessionStorageConstants.KEY_ACCESS_TOKEN;
    const data: string | null = SessionStorageUtils.get<typeof key>(key);
    return data ? <>{element}</> : <Navigate to={RoutesConstants.DEFAULT_ROUTE} replace state={{from: useLocation()}}/>;
};