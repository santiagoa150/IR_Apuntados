import {JSX, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {ValidationUtils} from '../../../../utils/validation.utils.ts';
import {PasswordFieldComponent} from '../../../../components/password-field/password-field.component.tsx';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import {RegisterRequest, RegisterResponse} from '../../../../types/services/register.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {SessionStorageUtils} from '../../../../store/session-storage.utils.ts';
import {SessionStorageConstants} from '../../../../store/session-storage.constants.ts';
import {useWebSocket} from '../../../../config/websocket.provider.tsx';

/**
 * Componente en dónde se define el registro de la aplicación.
 * @constructor
 */
export function RegisterComponent(): JSX.Element {

    /**
     * Hooks encargado de manejar el nombre de usuario que se registra
     * y sus validaciones.
     */
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');

    /**
     * Hook encargado de manejar la contraseña del usuario que se registra
     * y sus validaciones.
     */
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    /**
     * Hook encargado de manejar la confirmación contraseña del usuario
     * que se registra y sus validaciones.
     */
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>('');

    /**
     * Hooks encargados de manejar el funcionamiento del componente del registro.
     * Definen:
     * - La configuración para los componentes de carga.
     * - La configuración para la redirección exitosa.
     * - La configuración para los componentes de alertas.
     * - La conexión del web socket.
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {connectWebSocket} = useWebSocket();

    /**
     * Utils para acceder al registro en el backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils(
        (message: string) => {
            setLoading(false);
            setErrorMessage(message);
        }
    );

    /**
     * Permite cambiar la contraseña del usuario que se registra
     * y realizar sus validaciones.
     * @param {string} value La nueva contraseña.
     */
    const handleChangePassword = (value: string): void => {
        setPassword(value);
        ValidationUtils.validatePassword(value, setPasswordError);
    };

    /**
     * Permite cambiar la contraseña del usuario que se registra
     * y realizar sus validaciones.
     * @param {string} value La nueva contraseña.
     */
    const handleChangePasswordConfirmation = (value: string): void => {
        setPasswordConfirmation(value);
        ValidationUtils.validatePasswordConfirmation(value, password, setPasswordConfirmationError);
    };

    /**
     * Permite cambiar el nombre de usuario que se registra y realizar
     * sus validaciones.
     * @param {string} value El nuevo nombre de usuario.
     */
    const handleChangeUsername = (value: string): void => {
        setUsername(value);
        ValidationUtils.validateUsername(value, setUsernameError);
    };

    /**
     * Método que permite a un usuario registrarse en la aplicación.
     * @return {Promise<void | false>} Se retorna "false" si los datos son inválidos.
     */
    const registerUser = async (): Promise<void | false> => {
        let isValid: boolean = true;
        if (!ValidationUtils.validateUsername(username, setUsernameError)) isValid = false;
        if (!ValidationUtils.validatePassword(password, setPasswordError)) isValid = false;
        if (!ValidationUtils.validatePasswordConfirmation(passwordConfirmation, password, setPasswordConfirmationError)) isValid = false;
        if (!isValid) return isValid;
        setLoading(true);
        const body: RegisterRequest = {username: username.toLowerCase(), password};
        const res = await backendUtils.post<RegisterResponse, RegisterRequest>(BackendConstants.REGISTER_URL, body);
        if (res) {
            SessionStorageUtils.set<SessionStorageConstants.KEY_ACCESS_TOKEN>(SessionStorageConstants.KEY_ACCESS_TOKEN, res.accessToken);
            SessionStorageUtils.set<SessionStorageConstants.KEY_REFRESH_TOKEN>(SessionStorageConstants.KEY_REFRESH_TOKEN, res.refreshToken);
            setLoading(false);
            connectWebSocket();
            setRedirect(true);
        }
    };

    return (
        <>
            <section
                id='register-component-container'
                className='
                default-page-section-container
                component-container
                '
            >
                <h1>Registrarse</h1>
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
                    <PasswordFieldComponent
                        classname='default-page-form-input'
                        labelName='Confirmar contraseña'
                        passwordError={passwordConfirmationError}
                        setPassword={handleChangePasswordConfirmation}
                    />
                </form>
                <div className='default-page-send-container'>
                    <Button
                        className='default-page-send-button'
                        variant='contained'
                        onClick={registerUser}
                    >Confirmar</Button>
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