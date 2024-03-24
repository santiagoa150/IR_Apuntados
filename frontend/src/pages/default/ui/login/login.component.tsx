import {JSX, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {PasswordFieldComponent} from '../../../../components/password-field/password-field.component.tsx';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {ValidationUtils} from '../../../../utils/validation.utils.ts';
import {LoginRequest, LoginResponse} from './login.data.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import './login.component.css';
import {SessionStorageUtils} from '../../../../store/session-storage.utils.ts';
import {SessionStorageConstants} from '../../../../store/session-storage.constants.ts';

/**
 * Componente en dónde se define el componente para el login.
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
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Permite mapear los errores arrojados por el backend.
     * @param {string} message El mensaje de error.
     */
    const mapErrorsLogin = (message: string): void => {
        setLoading(false);
        setErrorMessage(message);
    };

    /**
     * Utils para acceder al backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils(mapErrorsLogin);


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
     * @return {Promise<void | false>} Se retorna "false" si los datos
     */
    const loginUser = async (): Promise<void | false> => {
        let isValid: boolean = true;
        if (!ValidationUtils.validateUsername(username, setUsernameError)) isValid = false;
        if (!ValidationUtils.validatePassword(password, setPasswordError)) isValid = false;
        if (!isValid) return isValid;
        setLoading(true);
        const body: LoginRequest = {username: username.toLowerCase(), password};
        const res = await backendUtils.post<LoginResponse, LoginRequest>(BackendConstants.LOGIN_URL, body);
        console.log(res);
        if (res) {
            SessionStorageUtils.set<SessionStorageConstants.KEY_ACCESS_TOKEN>(SessionStorageConstants.KEY_ACCESS_TOKEN, res.accessToken);
            SessionStorageUtils.set<SessionStorageConstants.KEY_REFRESH_TOKEN>(SessionStorageConstants.KEY_REFRESH_TOKEN, res.refreshToken);
            setLoading(false);
            setRedirect(true);
        }
    };

    return (
        <>
            <section
                id='login-component-container'
                className='component-container'
            >
                <h1>Iniciar sesión</h1>
                <form autoComplete='off'>
                    <TextField
                        className='login-component-input'
                        value={username}
                        label='Nombre de usuario'
                        variant='filled' required
                        error={!!usernameError}
                        helperText={usernameError}
                        onChange={(e) => handleChangeUsername(e.target.value)}
                    />
                    <PasswordFieldComponent
                        classname='login-component-input'
                        passwordError={passwordError}
                        setPassword={handleChangePassword}
                    />
                </form>
                <div id='login-component-send-container'>
                    <Button
                        id='login-component-send-button'
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
            {redirect ? <Navigate to={RoutesConstants.HOME_ROUTE}/> : <></>}
        </>
    );
}