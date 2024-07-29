import {JSX, useEffect, useState} from 'react';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import {HomeHeaderComponent} from './ui/header/home-header.component.tsx';
import './home.page.css';
import {CreateGameComponent} from './ui/create-game/create-game.component.tsx';
import {JoinGameComponent} from './ui/join-game/join-game.component.tsx';
import {UserType} from '../../types/user.type.ts';
import {BackendUtils} from '../../utils/backend.utils.tsx';
import {GetMeResponse} from '../../types/services/get-me.ts';
import {BackendConstants} from '../../utils/constants/backend.constants.ts';
import {ProfileConfigComponent} from './ui/profile-config/profile-config.component.tsx';

/**
 * Página principal del sistema.
 * @constructor
 */
export function HomePage(): JSX.Element {

    /**
     * Hook que controla el usuario que está ejecutando la aplicación.
     */
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const [isProfileConfigModelOpen, setIsIProfileConfigModelOpen] = useState<boolean>(new URLSearchParams(window.location.search).get('ps') === 'true');

    /**
     * Utils para acceder al usuario en el backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils();

    /**
     * Hook que consume el backend para traer al usuario.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const res = await backendUtils.get<GetMeResponse, never>(BackendConstants.GET_ME_URL);
            if (res) setUser(res.user);
        }

        fetchData().then();
    }, []);

    /**
     * Función que permite abrir el modal de configuración.
     */
    const openProfileConfigModal = (): void => {
        setIsIProfileConfigModelOpen(true);
        document.body.style.overflow = 'hidden';
    };

    /**
     * Función que permite cerrar el modal de configuración.
     */
    const closeProfileConfigModel = (): void => {
        setIsIProfileConfigModelOpen(false);
        document.body.style.overflow = 'unset';
        const url: URL = new URL(window.location.toString());
        url.search = '';
        window.history.replaceState({}, '', url);
    };

    return (
        <>
            <div
                id='home-page-container'
                className='page-container'
            >
                <HomeHeaderComponent
                    user={user}
                    openIProfileConfigModel={openProfileConfigModal}
                />
                <CreateGameComponent/>
                <VerticalLineComponent id='home-page-vertical-line'/>
                <JoinGameComponent/>
                <ProfileConfigComponent
                    user={user}
                    isOpen={isProfileConfigModelOpen}
                    closeModel={closeProfileConfigModel}
                />
            </div>
        </>
    );
}