import './game-board.component.css';
import React, {JSX, useEffect, useState} from 'react';
import {DiscardedCardsType} from '../../../../types/discarded-cards.type.ts';
import {PlayerType} from '../../../../types/player.type.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {GetCurrentPlayerResponse} from '../../../../types/services/get-current-player.ts';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardType} from '../../../../types/card.type.ts';
import {CardComponentTypeConstants} from '../../../../utils/constants/card-component-type.constants.ts';
import {
    changeDifferentTrips,
    changeKickerAndQuad,
    changeKickerAndTrip,
    changeQuadToTrip,
    changeSameTrip,
    changeTripToQuad
} from './game.board.utils.ts';
import CardDeckImage from '../../../../../public/assets/images/game/card-deck.jpg';
import DiscardedCardsImage from '../../../../../public/assets/images/game/discarded-cards.jpg';
import EmptyDiscardedCardsImage from '../../../../../public/assets/images/game/empty-discarded-cards.jpg';
import {PlayerConstants} from '../../../../utils/constants/player.constants.ts';

/**
 *  Componente que define el tablero del juego.
 *  @param props Los parámetros para el funcionamiento del juego.
 *  @param props.discardedCards Las cartas desechadas de la partida.
 * @constructor
 */
export function GameBoardComponent(props: { discardedCards: DiscardedCardsType | undefined }): JSX.Element {

    /**
     * Hooks para el almacenamiento y gestión de los elementos del jugador.
     */
    const [player, setPlayer] = useState<PlayerType | undefined>();
    const [trips1, setTrips1] = useState<[CardType, CardType, CardType] | undefined>();
    const [trips2, setTrips2] = useState<[CardType, CardType, CardType] | undefined>();
    const [quads, setQuads] = useState<[CardType, CardType, CardType, CardType] | undefined>();
    const [kicker, setKicker] = useState<CardType | undefined>();
    const [currentDesign, setCurrentDesign] = useState<string | undefined>();

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const backendUtils: BackendUtils = new BackendUtils();
            const res = await backendUtils.get<GetCurrentPlayerResponse, never>(BackendConstants.GET_CURRENT_PLAYER_URL);
            if (res) {
                setPlayer(res.player);
                setTrips1(res.player.trips1);
                setTrips2(res.player.trips2);
                setQuads(res.player.quads);
                setKicker(res.player.kicker);
                setCurrentDesign(res.currentDesignName);
            }
        }

        fetchData().then();
    }, []);

    /**
     * Evento utilizado cuando se inicia a mover la carta.
     * @param event El evento de react.
     * @param position La posición desde la que se empezó a mover.
     * @param positionType El elemento del tablero desde el cual se empezó a mover.
     */
    const onDragStartCard = (event: React.DragEvent, position: number, positionType: string): void => {
        event.dataTransfer.setData('text/plain', `${position} ${positionType}`);
        event.dataTransfer.effectAllowed = 'move';
    };

    /**
     * Función que define como es el movimiento de las cartas.
     * @param event El evento de react.
     */
    const onDragOverCard = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    /**
     * Función que define el comportamiento cuando se suelta una carta sobre otra.
     * @param event El evento de react.
     * @param position La posición en la que se soltó la carta.
     * @param positionType El elemento del tablero en el que se soltó la carta.
     */
    const onDropCard = (event: React.DragEvent, position: number, positionType: string): void => {
        event.preventDefault();
        const data: string = event.dataTransfer.getData('text/plain');
        const [rawPositionMoved, positionTypeMoved] = data.split(' ');
        const positionMoved = Number(rawPositionMoved);
        if (player && trips1 && trips2 && quads) {
            if (positionType === CardComponentTypeConstants.TRIPS1) {
                if (positionTypeMoved === CardComponentTypeConstants.TRIPS1) changeSameTrip(position, positionMoved, trips1, setTrips1);
                else if (positionTypeMoved === CardComponentTypeConstants.TRIPS2) changeDifferentTrips(position, positionMoved, trips1, trips2, setTrips1, setTrips2);
                else if (positionTypeMoved === CardComponentTypeConstants.QUADS) changeQuadToTrip(position, positionMoved, trips1, quads, setTrips1, setQuads);
                else if (positionTypeMoved === CardComponentTypeConstants.KICKER && kicker) changeKickerAndTrip(position, trips1, kicker, setTrips1, setKicker);
            } else if (positionType === CardComponentTypeConstants.TRIPS2) {
                if (positionTypeMoved === CardComponentTypeConstants.TRIPS2) changeSameTrip(position, positionMoved, trips2, setTrips2);
                else if (positionTypeMoved === CardComponentTypeConstants.TRIPS1) changeDifferentTrips(position, positionMoved, trips2, trips1, setTrips2, setTrips1);
                else if (positionTypeMoved === CardComponentTypeConstants.QUADS) changeQuadToTrip(position, positionMoved, trips2, quads, setTrips2, setQuads);
                else if (positionTypeMoved === CardComponentTypeConstants.KICKER && kicker) changeKickerAndTrip(position, trips2, kicker, setTrips2, setKicker);
            } else if (positionType === CardComponentTypeConstants.QUADS) {
                if (positionTypeMoved === CardComponentTypeConstants.TRIPS1) changeTripToQuad(position, positionMoved, trips1, quads, setTrips1, setQuads);
                else if (positionTypeMoved === CardComponentTypeConstants.TRIPS2) changeTripToQuad(position, positionMoved, trips2, quads, setTrips2, setQuads);
                else if (positionTypeMoved === CardComponentTypeConstants.QUADS) {
                    const newQuads = quads.map((t, i) => {
                        if (i === position) {
                            return quads[positionMoved];
                        } else if (i === positionMoved) {
                            return quads[position];
                        } else {
                            return t;
                        }
                    });
                    setQuads(newQuads as [CardType, CardType, CardType, CardType]);
                } else if (positionTypeMoved === CardComponentTypeConstants.KICKER && kicker) changeKickerAndQuad(position, quads, kicker, setQuads, setKicker);
            } else if (positionType === CardComponentTypeConstants.KICKER && kicker) {
                if (positionTypeMoved === CardComponentTypeConstants.TRIPS1) changeKickerAndTrip(positionMoved, trips1, kicker, setTrips1, setKicker);
                else if (positionTypeMoved === CardComponentTypeConstants.TRIPS2) changeKickerAndTrip(positionMoved, trips2, kicker, setTrips2, setKicker);
                else if (positionTypeMoved === CardComponentTypeConstants.QUADS) changeKickerAndQuad(positionMoved, quads, kicker, setQuads, setKicker);
            }
        }
    };

    return (
        <>
            <div id='game-board-component-container' className='component-container'>
                <div id='game-board-maze-container'>
                    <img
                        className='game-board-maze-container-item'
                        id='game-board-card-deck'
                        alt=''
                        src={CardDeckImage}
                    />
                    <div id='game-board-discarded-cards-container'>
                        <img

                            className={`game-board-maze-container-item ${
                                player && player.status === PlayerConstants.IN_TURN_PLAYER_STATUS && kicker
                                    ? 'game-element-available' : ''}
                                `}
                            id='game-board-discarded-cards-image'
                            alt=''
                            src={props.discardedCards && props.discardedCards.cards.length > 0 ? DiscardedCardsImage : EmptyDiscardedCardsImage}
                        />
                    </div>
                </div>
                <div id='game-board-cards-container'>
                    {
                        player && trips1 && trips2 && quads
                            ? <>
                                <div id='game-board-trips-container'>
                                    <div>
                                        {trips1.map((c, i) => {
                                            return (
                                                <CardComponent
                                                    key={c.suit + c.type}
                                                    designName={currentDesign ?? 'DEFAULT'}
                                                    suit={c.suit}
                                                    type={c.type}
                                                    isDraggable={true}
                                                    position={i}
                                                    positionType={CardComponentTypeConstants.TRIPS1}
                                                    onDragStart={onDragStartCard}
                                                    onDragOver={onDragOverCard}
                                                    onDrop={onDropCard}
                                                    positionClassName='game-board-card'
                                                />
                                            );
                                        })}
                                    </div>
                                    <div>
                                        {trips2.map((c, i) => {
                                            return (
                                                <CardComponent
                                                    key={c.suit + c.type}
                                                    designName={currentDesign ?? 'DEFAULT'}
                                                    suit={c.suit}
                                                    type={c.type}
                                                    position={i}
                                                    positionType={CardComponentTypeConstants.TRIPS2}
                                                    onDragStart={onDragStartCard}
                                                    onDragOver={onDragOverCard}
                                                    onDrop={onDropCard}
                                                    isDraggable={true}
                                                    positionClassName='game-board-card'
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div id='game-board-quads-container'>
                                    <div>
                                        {quads.map((c, i) => {
                                            return (
                                                <CardComponent
                                                    key={c.suit + c.type}
                                                    designName={currentDesign ?? 'DEFAULT'}
                                                    suit={c.suit}
                                                    type={c.type}
                                                    position={i}
                                                    positionType={CardComponentTypeConstants.QUADS}
                                                    onDragStart={onDragStartCard}
                                                    onDragOver={onDragOverCard}
                                                    onDrop={onDropCard}
                                                    isDraggable={true}
                                                    positionClassName='game-board-card'
                                                />
                                            );
                                        })}
                                    </div>
                                    <div>
                                        {
                                            kicker
                                                ? <CardComponent
                                                    designName={'RED'}
                                                    suit={kicker.suit}
                                                    type={kicker.type}
                                                    isDraggable={true}
                                                    position={0}
                                                    positionType={CardComponentTypeConstants.KICKER}
                                                    onDragStart={onDragStartCard}
                                                    onDragOver={onDragOverCard}
                                                    onDrop={onDropCard}
                                                    positionClassName='game-board-card'
                                                />
                                                : <></>
                                        }
                                    </div>
                                </div>
                            </>
                            : <LocalLoadingComponent loading={true} showBackground={false}/>
                    }
                </div>
            </div>
        </>
    );
}