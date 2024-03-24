import {JSX} from 'react';
import './vertical-line.component.css';

/**
 * Define el componente de una línea vertical.
 * @function
 * @param props Define los parámetros del componente.
 * @param props.id El identificador único para el componente.
 */
export function VerticalLineComponent(
    props: { id: string }
): JSX.Element {
    return (
        <div className='vertical-line' id={props.id}>
            <div></div>
        </div>
    );
}