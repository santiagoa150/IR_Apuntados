import {JSX, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {PasswordFieldComponent} from '../../../../components/password-field/password-field.component.tsx';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {ValidationUtils} from '../../../../utils/validation.utils.ts';
import {LoginRequest, LoginResponse} from '../../../../types/services/login.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import {LocaleStorageUtils} from '../../../../store/locale-storage.utils.ts';
import {LocaleStorageConstants} from '../../../../store/locale-storage.constants.ts';
import {useWebSocket} from '../../../../config/websocket.provider.tsx';

/**
 * Componente en dónde se define el login de la aplicación.
 * @constructor
 */
export function LoginComponent(): JSX.Element {

    /**
     * Hooks encargado de manejar el nombre de usuario y
     * sus validaciones.
     */
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');

    /**
     * Hook encargado de manejar la contraseña del usuario y
     * sus validaciones.
     */
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    /**
     * Hooks encargados de manejar el funcionamiento del componente.
     * Definen:
     * - La configuración para los componentes de carga.
     * - La configuración para la redirección exitosa.
     * - La configuración para los componentes de alertas.
     * - El hook para la conexión del websocket.
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [redirectRoute, setRedirectRoute] = useState<string>(RoutesConstants.HOME_ROUTE);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {connectWebSocket} = useWebSocket();

    /**
     * Utils para acceder al backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils(
        (message: string) => {
            setLoading(false);
            setErrorMessage(message);
        }
    );


    /**
     * Permite cambiar el nombre de usuario y realizar sus validaciones.
     * @param {string} value El nuevo nombre de usuario.
     */
    const handleChangeUsername = (value: string): void => {
        setUsername(value);
        ValidationUtils.validateUsername(value, setUsernameError);
    };

    /**
     * Permite cambiar la contraseña del usuario y realizar sus validaciones.
     * @param {string} value La nueva contraseña.
     */
    const handleChangePassword = (value: string): void => {
        setPassword(value);
        ValidationUtils.validatePassword(value, setPasswordError);
    };

    /**
     * Método que permite a un usuario ingresar a la aplicación.
     * @return {Promise<void | false>} Se retorna "false" si los datos son inválidos.
     */
    const loginUser = async (): Promise<void | false> => {
        let isValid: boolean = true;
        if (!ValidationUtils.validateUsername(username, setUsernameError)) isValid = false;
        if (!ValidationUtils.validatePassword(password, setPasswordError)) isValid = false;
        if (!isValid) return isValid;
        setLoading(true);
        const body: LoginRequest = {username: username.toLowerCase(), password};
        const res = await backendUtils.post<LoginResponse, LoginRequest>(BackendConstants.LOGIN_URL, body);
        if (res) {
            LocaleStorageUtils.set<LocaleStorageConstants.KEY_ACCESS_TOKEN>(LocaleStorageConstants.KEY_ACCESS_TOKEN, res.accessToken);
            LocaleStorageUtils.set<LocaleStorageConstants.KEY_REFRESH_TOKEN>(LocaleStorageConstants.KEY_REFRESH_TOKEN, res.refreshToken);
            LocaleStorageUtils.set<LocaleStorageConstants.KEY_USER_ID>(LocaleStorageConstants.KEY_USER_ID, res.userId);
            const redirectRoute: string | null = new URLSearchParams(window.location.search).get('redirect');
            setLoading(false);
            connectWebSocket();
            if (redirectRoute) setRedirectRoute(redirectRoute);
            setRedirect(true);
        }
    };

    return (
        <>
            <section
                id='login-component-container'
                className='
                default-page-section-container
                component-container
                '
            >
                <h1>Iniciar sesión</h1>
                <form
                    className='default-page-form-container'
                    autoComplete='off'
                >
                    <TextField
                        className='default-page-form-input'
                        value={username}
                        label='Nombre de usuario'
                        variant='filled' required
                        error={!!usernameError}
                        helperText={usernameError}
                        onChange={(e) => handleChangeUsername(e.target.value)}
                    />
                    <PasswordFieldComponent
                        classname='default-page-form-input'
                        passwordError={passwordError}
                        setPassword={handleChangePassword}
                    />
                </form>
                <div className='default-page-send-container'>
                    <Button
                        className='default-page-send-button'
                        variant='contained'
                        onClick={loginUser}
                    >Ingresar</Button>
                </div>
            </section>
            <AlertComponent
                type={AlertTypeConstants.ERROR_ALERT}
                rawMessage={errorMessage}
                setRawMessage={setErrorMessage}
            />
            <GlobalLoadingComponent loading={loading}/>
            {redirect ? <Navigate to={redirectRoute}/> : <></>}
        </>
    );
}