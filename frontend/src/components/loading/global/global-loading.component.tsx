import {Backdrop, CircularProgress} from '@mui/material';
import {JSX} from 'react';

/**
 * Componente que define, el componente de carga global de la aplicación.
 * @param props Los parámetros para el funcionamiento del componente.
 * @param props.loading Determina si se debe mostrar el componente.
 * @constructor
 */
export function GlobalLoadingComponent(
    props: {
        loading: boolean,
    }
): JSX.Element {
    return (
        <Backdrop
            open={props.loading}
            sx={{zIndex: (theme) => theme.zIndex.drawer - 1,}}
        >
            <CircularProgress color='inherit'/>
        </Backdrop>
    );
}