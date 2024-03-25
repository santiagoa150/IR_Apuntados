import {Backdrop, CircularProgress} from '@mui/material';
import {JSX} from 'react';

/**
 * Componente que define, la carga local de la aplicación.
 * Funcionamiento:
 * - Require que su padre tenga la propiedad de css: 'position: relative'
 * @param props Los parámetros para el funcionamiento del componente.
 * @param props.loading Determina si se debe mostrar el componente.
 * @constructor
 */
export function LocalLoadingComponent(
    props: {
        loading: boolean,
        showBackground: boolean
    }
): JSX.Element {
    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}
        >
            <Backdrop
                open={props.loading}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: props.showBackground ? '' : 'transparent',
                    zIndex: (theme) => theme.zIndex.drawer - 1,
                }}
            >
                <CircularProgress color='inherit'/>
            </Backdrop>
        </div>
    );
}