import React, {useEffect, useState} from 'react';
import {LocaleStorageConstants} from '../store/locale-storage.constants.ts';
import {LocaleStorageUtils} from '../store/locale-storage.utils.ts';
import {RoutesConstants} from './app.router.tsx';
import {BackendUtils} from '../utils/backend.utils.tsx';
import {GetMeResponse} from '../types/services/get-me.ts';
import {BackendConstants} from '../utils/constants/backend.constants.ts';
import {UserStatusConstants} from '../utils/constants/user.constants.ts';
import {Navigate} from 'react-router-dom';
import {GlobalLoadingComponent} from '../components/loading/global/global-loading.component.tsx';

/**
 * Guardia de la aplicación para las páginas que requieren estar jugando.
 * @param element La página que se renderiza en caso de que se pueda acceder.
 * @returns {React.ReactNode} La página que se renderizará.
 * @constructor
 */

export const GameGuard = ({element}: { element: React.ReactNode }): React.ReactNode => {

    /**
     * Hook para manejar la ruta a la que redirecciona la guardia.
     */
    const [route, setRoute] = useState(RoutesConstants.DEFAULT_ROUTE);

    /**
     * Hook para saber si un usuario está jugando o no.
     */
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Lógica de validación de la guardia.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const key: LocaleStorageConstants = LocaleStorageConstants.KEY_ACCESS_TOKEN;
            const data: string | null = LocaleStorageUtils.get<typeof key>(key);
            if (data) {
                const backendUtils: BackendUtils = new BackendUtils();
                const res = await backendUtils.get<GetMeResponse, never>(BackendConstants.GET_ME_URL);
                if (res && res.user.status === UserStatusConstants.PLAYING) {
                    setIsValid(true);
                }
                setRoute(RoutesConstants.HOME_ROUTE);
            }
            setIsLoading(false);
        }

        fetchData().then();
    }, []);

    return isLoading ? <GlobalLoadingComponent loading={isLoading}/> : isValid ? <>{element}</> : <Navigate to={route}/>;
};