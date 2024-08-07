import React, {JSX} from 'react';
import './card.component.css';

/**
 * Componente que define una carta.
 * @param props Parámetros necesarios para el funcionamiento del componente.
 * @param props.designName El diseño de la carta
 * @param props.suit La pinta de la carta.
 * @param props.type El tipo de la carta.
 * @param props.positionClassName Clase utilizada para cambiar la posición de la imagen.
 * @constructor
 */
export function CardComponent(
    props: {
        designName: string;
        suit: string;
        type: string;
        positionClassName?: string
        isDraggable?: boolean
        position?: number
        positionType?: string
        onDrop?: (event: React.DragEvent, position: number, positionType: string) => void
        onDragStart?: (event: React.DragEvent, position: number, positionType: string) => void;
        onDragOver?: (event: React.DragEvent) => void;
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
            onDragStart={(event) => {
                props.isDraggable && props.onDragStart && props.positionType && typeof props.position !== 'undefined' && (props.onDragStart(event, props.position, props.positionType));
            }}
            onDrop={(event) => {
                props.isDraggable && props.onDrop && props.positionType && typeof props.position !== 'undefined' && (props.onDrop(event, props.position, props.positionType));
            }}
            onDragOver={(event) => props.isDraggable && props.onDragOver && (props.onDragOver(event))}
            draggable={props.isDraggable}
            className={`card-image ${props.positionClassName}`}
            src={imageRoute}
        />
    );
}