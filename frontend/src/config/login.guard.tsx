import React from 'react';
import {LocaleStorageUtils} from '../store/locale-storage.utils.ts';
import {LocaleStorageConstants} from '../store/locale-storage.constants.ts';
import {Navigate, useLocation} from 'react-router-dom';
import {RoutesConstants} from './app.router.tsx';

/**
 * Guardia de la aplicación para las páginas que requieren acceso al aplicativo.
 * @param element La página que se renderiza en caso de que se pueda acceder.
 * @returns {React.ReactNode} La página que se renderizará.
 * @constructor
 */
export const LoginGuard = ({element}: { element: React.ReactNode }): React.ReactNode => {
    const key: LocaleStorageConstants = LocaleStorageConstants.KEY_ACCESS_TOKEN;
    const data: string | null = LocaleStorageUtils.get<typeof key>(key);
    return data ? <>{element}</> : <Navigate to={RoutesConstants.DEFAULT_ROUTE} replace state={{from: useLocation()}}/>;
};