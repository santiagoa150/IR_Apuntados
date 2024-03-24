import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel} from '@mui/material';
import {JSX, useState} from 'react';

/**
 * Componente en dónde se define un input de una contraseña.
 * @param props Los parámetros requeridos para el funcionamiento del input.
 * @param {string} props.classname El classname del from control.
 * @param {string} [props.labelname] El label que se mostrará en el componente.
 * @param {(value: string) => void} props.setPassword El hook que guarda la contraseña.
 * @constructor
 */
export function PasswordFieldComponent(
    props: {
        classname: string;
        labelName?: string;
        passwordError: string;
        setPassword: (value: string) => void;
    }
): JSX.Element {

    /**
     * Hook que determina si se debe mostrar o no la contraseña.
     */
    const [show, setShow] = useState<boolean>(false);

    return (
        <FormControl className={props.classname} variant='filled'>
            <InputLabel
                required
                variant='filled'
                htmlFor='filled-adornment-password'
                error={!!props.passwordError}
            >
                {props.labelName || 'Contraseña'}
            </InputLabel>
            <FilledInput
                type={show ? 'text' : 'password'}
                error={!!props.passwordError}
                onChange={(e) => props.setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={() => setShow(!show)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {show ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {!!props.passwordError &&
                <FormHelperText sx={{color: 'var(--error)'}}>{props.passwordError}</FormHelperText>}
        </FormControl>
    );
}