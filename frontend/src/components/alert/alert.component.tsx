import {Alert, Snackbar} from '@mui/material';
import {Dispatch, JSX, SetStateAction} from 'react';
import {AlertMessagesConstants, AlertTypeConstants} from '../../utils/constants/alert.constants.ts';

/**
 * Componente que define las alertas del sistema.
 * @param props Los parámetros para el funcionamiento del componente.
 * @param {AlertTypeConstants} props.type El tipo de la alerta.
 * @param {string | undefined} props.rawMessage El mensaje que se mostrará en la alerta.
 * @param {Dispatch<SetStateAction<string>>} props.setRawMessage Hook para re establecer
 * el mensaje de la alerta.
 * @constructor
 */
export function AlertComponent(
    props: {
        type: AlertTypeConstants,
        rawMessage: string;
        setRawMessage: Dispatch<SetStateAction<string>>;
    }
): JSX.Element {
    return (
        <Snackbar
            open={!!props.rawMessage}
            autoHideDuration={1500}
            onClose={() => props.setRawMessage('')}
        >
            <Alert
                severity={props.type}
                sx={{width: '100%'}}
                onClose={() => props.setRawMessage('')}
            >
                {AlertMessagesConstants[props.rawMessage] || AlertMessagesConstants.UNKNOWN_ERROR}
            </Alert>
        </Snackbar>
    );
}