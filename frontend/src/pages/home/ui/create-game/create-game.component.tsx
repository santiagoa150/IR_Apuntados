import {JSX, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {CheckBoxGroupComponent} from '../../../../components/check-box-group/check-box-group.component.tsx';
import {ValidationUtils} from '../../../../utils/validation.utils.ts';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {CreateGameRequest, CreateGameResponse} from '../../../../types/services/create-game.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {Navigate} from 'react-router-dom';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import './create-game.component.css';

export function CreateGameComponent(): JSX.Element {

    /**
     * Hooks para manejar los checkbox values.
     */
    const [players, setPlayers] = useState<number>(2);
    const [isPublic, setIsPublic] = useState<boolean>(false);

    /**
     * Hooks para manejar el nombre del juego.
     */
    const [gameName, setGameName] = useState<string>('');
    const [gameNameError, setGameNameError] = useState<string>('');

    /**
     * Hook para manejar el valor de la apuesta de un juego.
     */
    const [betByPlayer, setBeByPlayer] = useState<number | string>(1);
    const [betByPlayerError, setBetByPlayerError] = useState<string>('');

    /**
     * Permite cambiar el nombre del juego y realizar sus validaciones.
     * @param {string} value El nuevo nombre del juego.
     */
    const handleChangeGameName = (value: string): void => {
        setGameName(value);
        ValidationUtils.validateGameName(value, setGameNameError);
    };

    /**
     * Permite cambiar el valor de la apuesta de un juego y realizar sus validaciones.
     * @param {string} value El valor de la apuesta de del juego.
     */
    const handleChangeBetByPlayer = (value: string): void => {
        const toValidate: string | number = value == '' ? '' : parseInt(value as string, 0);
        setBeByPlayer(toValidate);
        ValidationUtils.validateBetByPlayer(toValidate, setBetByPlayerError);
    };

    /**
     * Hooks para la configuración del componente.
     * Define:
     * - El componente de carga.
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

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
     * Método que permite crear un juego de la aplicación.
     * @returns {Promise<void | false>} Retorna "false" si los datos no son válidos.
     */
    const createGame = async (): Promise<void | false> => {
        if (!ValidationUtils.validateGameName(gameName, setGameNameError)) return false;
        if (!ValidationUtils.validateBetByPlayer(betByPlayer, setBetByPlayerError)) return false;
        setLoading(true);
        const body: CreateGameRequest = {
            name: gameName,
            isPublic: Boolean(isPublic),
            requiredPlayers: Number(players),
            betByPlayer: betByPlayer as number,
        };
        const res = await backendUtils.post<CreateGameResponse, CreateGameRequest>(BackendConstants.CREATE_GAME_URL, body);
        if (res) {
            setLoading(false);
            setRedirect(true);
        }
    };

    return (
        <>
            <section
                id='create-game-component-container'
                className='component-container'
            >
                <h1>Crear juego</h1>
                <form id='create-game-form-container' autoComplete='off'>
                    <CheckBoxGroupComponent
                        label='Jugadores'
                        selected={players}
                        setSelected={setPlayers}
                        values={[
                            {value: 2, label: '2'},
                            {value: 3, label: '3'},
                            {value: 4, label: '4'},
                            {value: 5, label: '5'},
                            {value: 6, label: '6'},
                        ]}
                    />
                    <CheckBoxGroupComponent
                        label='Visibilidad'
                        selected={isPublic}
                        setSelected={setIsPublic}
                        values={[
                            {value: true, label: 'Pública'},
                            {value: false, label: 'Privada'},
                        ]}/>
                    <TextField
                        required
                        label='Nombre'
                        variant='filled'
                        value={gameName}
                        error={!!gameNameError}
                        helperText={gameNameError}
                        className='create-game-form-input'
                        onChange={(e) => handleChangeGameName(e.target.value)}
                    />
                    <TextField
                        required
                        label='Valor de apuesta'
                        variant='filled'
                        type='number'
                        value={betByPlayer}
                        error={!!betByPlayerError}
                        helperText={betByPlayerError}
                        className='create-game-form-input'
                        onChange={(e) => handleChangeBetByPlayer(e.target.value)}
                    />
                </form>
                <div id='create-game-send-container'>
                    <Button
                        variant='contained'
                        onClick={createGame}
                    >Aceptar</Button>
                </div>
            </section>
            <GlobalLoadingComponent loading={loading}/>
            <AlertComponent
                type={AlertTypeConstants.ERROR_ALERT}
                rawMessage={errorMessage}
                setRawMessage={setErrorMessage}
            />
            {redirect ? <Navigate to={RoutesConstants.WAITING_GAME_ROUTE}/> : <></>}
        </>
    );
}