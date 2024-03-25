import {JSX} from 'react';
import './card.component.css';

/**
 * Componente que define una carta.
 * @param props Parámetros necesarios para el funcionamiento del componente.
 * @param props.designName El diseño de la carta
 * @param props.suit La pinta de la carta.
 * @param props.type El tipo de la carta.
 * @constructor
 */
export function CardComponent(
    props: {
        designName: string;
        suit: string;
        type: string;
    }
): JSX.Element {

    /**
     * Define la ruta en la que se aloja la imagen
     * @const {string}
     */
    const imageRoute: string = `${import.meta.env.VITE_CARD_IMAGES_URL}${props.designName}/${props.suit}-${props.type}.png`;

    return (
        <img
            alt=''
            className='card-image'
            src={imageRoute}
        />
    );
}