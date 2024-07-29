import {JSX, useState} from 'react';
import {UserType} from '../../../../types/user.type.ts';
import './profile-config.component.css';
import {Button, TextField} from '@mui/material';
import {SessionStorageConstants} from '../../../../store/session-storage.constants.ts';
import {SessionStorageUtils} from '../../../../store/session-storage.utils.ts';
import {Navigate} from 'react-router-dom';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {UpdateUserIconRequest, UpdateUserIconResponse} from '../../../../types/services/update-user-icon.ts';

/**
 * Componente que permite configurar el perfíl de un usuario.
 * @constructor
 */
export function ProfileConfigComponent(
    props: {
        user: UserType | undefined,
        isOpen: boolean,
        closeModel: () => (void)
    }
): JSX.Element {

    /**
     * Hooks para la configuración del componente.
     */
    const [redirect, setRedirect] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Función encargada de cerrar la sesión de un usuario.
     * - Limpia las claves de caché.
     * - Redirige a la página principal.
     */
    const closeSession = () => {
        const keys: SessionStorageConstants[] = Object.values(SessionStorageConstants);
        keys.forEach(SessionStorageUtils.del);
        document.body.style.overflow = 'unset';
        setRedirect(true);
    };

    /**
     * Permite construir la ruta en dónde se encuentran los iconos de la app.
     * @param {string} icon El icono que se busca.
     * @return {string} La url construida.
     */
    const buildProfileImageRoute = (icon: string): string => {
        return `${import.meta.env.VITE_PROFILE_IMAGES_URL}${icon}.png`;
    };

    const saveIcon = async (icon: string): Promise<void> => {
        const backendUtils: BackendUtils = new BackendUtils(
            (message: string) => {
                setLoading(false);
                setErrorMessage(message);
            }
        );
        setLoading(true);
        const res = await backendUtils.patch<UpdateUserIconResponse, UpdateUserIconRequest>(BackendConstants.UPDATE_USER_ICON, {icon});
        if (res) {
            setLoading(false);
            const params: URLSearchParams = new URLSearchParams({ps: 'true'});
            window.location.search = params.toString();
        }
    };

    return (
        <>
            {
                props.isOpen
                    ? <div id='profile-config-component-container'>
                        <div id='profile-config-modal-container'>
                            <div>
                                {
                                    props.user
                                        ? <div id='profile-config-model-user-info'>
                                            <img
                                                alt=''
                                                id='profile-config-model-current-photo'
                                                src={buildProfileImageRoute(props.user.icon)}
                                            />
                                            <div id='profile-config-model-user-info-buttons'>
                                                <TextField
                                                    required
                                                    label='Tokens'
                                                    variant='filled'
                                                    type='text'
                                                    value={props.user.tokens}
                                                    disabled={true}
                                                    className='profile-config-model-input'
                                                />
                                                <TextField
                                                    required
                                                    label='Nombre de usuario'
                                                    variant='filled'
                                                    type='text'
                                                    value={props.user.username}
                                                    disabled={true}
                                                    className='profile-config-model-input'
                                                />
                                            </div>
                                            <div id='profile-config-model-user-current-design'>
                                                <p>Diseño actual:</p>
                                                <CardComponent
                                                    type='A'
                                                    suit={CardSuitsConstants.SPADE}
                                                    designName={props.user.currentDesignName}
                                                />
                                            </div>
                                        </div>
                                        : <></>
                                }

                            </div>
                            <div id='profile-config-modal-photo-option-father-container'>
                                <h1>Diseños disponibles:</h1>
                                <div id='profile-config-modal-photo-option-container'>
                                    {
                                        ['ICON1', 'ICON2', 'ICON3', 'ICON4', 'ICON5'].map((icon) => {
                                            return (
                                                <img
                                                    id={'profile-config-modal-photo-option' + icon}
                                                    className={`profile-config-modal-photo-option ${icon === props.user?.icon ? 'profile-config-modal-photo-option-selected-border' : ''}`}
                                                    alt=''
                                                    onMouseEnter={() => {
                                                        const element = document.getElementById('profile-config-modal-photo-option' + icon);
                                                        if (element) element.style.width = '28%';
                                                    }}
                                                    onMouseLeave={() => {
                                                        const element = document.getElementById('profile-config-modal-photo-option' + icon);
                                                        if (element) element.style.width = '25%';
                                                    }}
                                                    key={icon}
                                                    src={buildProfileImageRoute(icon)}
                                                    onClick={() => saveIcon(icon)}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div id='profile-config-modal-buttons-container'>
                                <Button variant='contained' onClick={() => props.closeModel()}>Atrás</Button>
                                <Button
                                    id='profile-config-model-close-session'
                                    variant='contained'
                                    color='error'
                                    onClick={closeSession}
                                >Cerrar sesión</Button>
                            </div>
                        </div>
                    </div>
                    : <></>
            }
            <GlobalLoadingComponent loading={loading}/>
            <AlertComponent
                type={AlertTypeConstants.ERROR_ALERT}
                rawMessage={errorMessage}
                setRawMessage={setErrorMessage}
            />
            {redirect ? <Navigate to={RoutesConstants.DEFAULT_ROUTE}/> : <></>}
        </>
    );
}