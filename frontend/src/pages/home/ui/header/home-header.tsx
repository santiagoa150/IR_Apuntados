import {JSX, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup} from '@mui/material';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import TutorialPDF from '../../../../assets/documents/Tutorial.pdf';
import './home-header.css';
import {UserType} from '../../../../types/user.type.ts';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {GetMeResponse} from '../../../../types/services/get-me.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';

/**
 * Componente en dónde se define el header de la página
 * principal de la aplicación
 * @constructor
 */
export function HomeHeader(): JSX.Element {

    /**
     * Hook que controla el usuario que está ejecutando la aplicación.
     */
    const [user, setUser] = useState<UserType | undefined>(undefined);

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

        fetchData();
    }, []);

    /**
     * Permite construir la ruta en dónde se encuentran los iconos de la app.
     * @param {string} icon El icono que se busca.
     * @return {string} La url construida.
     */
    const buildProfileImageRoute = (icon: string): string => {
        return `${import.meta.env.VITE_PROFILE_IMAGES_URL}${icon}.png`;
    };

    return (
        <>
            <header id='home-header-component-container' className='component-container'>
                <div id='home-header-button-group-container' className='component-container'>
                    <ButtonGroup
                        id='home-header-button-group'
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <div className='home-header-button-container'>
                            <a
                                target="_blank"
                                href={TutorialPDF}
                                rel="noopener noreferrer"
                            >
                                <Button>Reglas</Button>
                            </a>
                        </div>
                        <Link
                            to={RoutesConstants.CARD_DESIGNS_ROUTE}
                            className='home-header-button-container'
                        >
                            <Button>Personalizar</Button>
                        </Link>
                        <div className='home-header-button-container'>
                            <Button>Comprar tokens</Button>
                        </div>
                    </ButtonGroup>
                </div>
                <div id='home-header-info'>
                    {
                        user
                            ? <>
                                <img
                                    alt=''
                                    className='home-header-info-image'
                                    src={buildProfileImageRoute(user.icon)}/>
                                <h4>{user.tokens}</h4>
                            </>
                            : <div className='home-header-info-image'>
                                <LocalLoadingComponent loading={true} showBackground={false}/>
                            </div>
                    }
                </div>
            </header>
        </>
    );
}