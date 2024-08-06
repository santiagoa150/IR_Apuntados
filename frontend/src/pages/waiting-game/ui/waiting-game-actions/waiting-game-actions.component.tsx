import {JSX, useState} from 'react';
import {GameType} from '../../../../types/game.type.ts';
import {Button, IconButton} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import './waiting-game-actions.component.css';
import {GameConstants} from '../../../../utils/constants/game.constants.ts';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {RoutesConstants} from '../../../../config/app.router.tsx';

/**
 * Componente para listar las acciones de un juego en la sala de espera.
 * @constructor
 */
export function WaitingGameActionsComponent(props: { game: GameType | undefined }): JSX.Element {

    const [alertType, setAlertType] = useState<AlertTypeConstants>(AlertTypeConstants.SUCCESS_ALERT);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const copyOnClipboard = (): void => {
        const message: string = `
¡Únete a nuestra partida de cartas!

Haz clic en el enlace a continuación para unirte a la partida:
${import.meta.env.VITE_FRONTEND_BASE_URL}${RoutesConstants.JOIN_GAME}?gameId=${props.game?.gameId}

Si el enlace no funciona, copia y pega la URL en tu navegador. ¡Te esperamos para una emocionante partida!`;

        navigator.clipboard.writeText(message)
            .then(() => {
                setAlertType(AlertTypeConstants.SUCCESS_ALERT);
                setAlertMessage('COPY_ON_CLIP_BOARD_MESSAGE');
            })
            .catch(() => {
                setAlertType(AlertTypeConstants.ERROR_ALERT);
                setAlertMessage('SOMETHING_WENT_WRONG_ERROR');
            });

    };

    return (
        <>
            <div id='waiting-game-actions-component-container' className='component-container'>
                <IconButton
                    onClick={() => copyOnClipboard()}
                    id='waiting-game-actions-component-share-button'
                    disabled={!props.game ? true : props.game.status === GameConstants.GAME_STATUS_WAITING_TO_START}
                >
                    <ShareIcon></ShareIcon>
                </IconButton>
                <Button
                    id='waiting-game-actions-component-start-button'
                    variant='contained'
                    disabled={!props.game ? true : props.game.status !== GameConstants.GAME_STATUS_WAITING_TO_START}
                >Iniciar</Button>
            </div>
            <AlertComponent
                type={alertType}
                rawMessage={alertMessage}
                setRawMessage={setAlertMessage}
            />
        </>
    );
}