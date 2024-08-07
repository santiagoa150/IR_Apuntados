import {CardType} from '../../../../types/card.type.ts';
import {Dispatch, SetStateAction} from 'react';

/**
 * Función que intercambia elementos de una misma terna.
 * @param position La posición a la que se está moviendo una carta.
 * @param positionMoved La posición desde la que se mueve la carta.
 * @param trips El arreglo de las cartas.
 * @param setTrips El hook de react para guardar la terna.
 */
export function changeSameTrip(
    position: number,
    positionMoved: number,
    trips: CardType[],
    setTrips: Dispatch<SetStateAction<[CardType, CardType, CardType] | undefined>>
): void {
    const newTripsArray: CardType[] = trips.map((t, i) => {
        if (i === position) {
            return trips[positionMoved];
        } else if (i === positionMoved) {
            return trips[position];
        } else {
            return t;
        }
    });
    setTrips(newTripsArray as [CardType, CardType, CardType]);
}

/**
 * Función que intercambia elementos de dos ternas diferentes.
 * @param position La posición a la que se está moviendo una carta.
 * @param positionMoved La posición desde la que se mueve la carta.
 * @param tripsTo El arreglo al que se está moviendo la carta.
 * @param tripsFrom El arreglo desde el que se mueve la carta.
 * @param setTripsTo El hook de react para guardar la terna de destino.
 * @param setTripsFrom El hook de react para guardar la terna de origen.
 */
export function changeDifferentTrips(
    position: number,
    positionMoved: number,
    tripsTo: CardType[],
    tripsFrom: CardType[],
    setTripsTo: Dispatch<SetStateAction<[CardType, CardType, CardType] | undefined>>,
    setTripsFrom: Dispatch<SetStateAction<[CardType, CardType, CardType] | undefined>>
): void {
    let backUp: CardType;
    const newTripsTo: CardType[] = tripsTo.map((t, i) => {
        if (i === position) {
            backUp = t;
            return tripsFrom[positionMoved];
        } else {
            return t;
        }
    });
    const newTripsFrom: CardType[] = tripsFrom.map((t, i) => {
        if (i === positionMoved) {
            return backUp;
        } else {
            return t;
        }
    });
    setTripsTo(newTripsTo as [CardType, CardType, CardType]);
    setTripsFrom(newTripsFrom as [CardType, CardType, CardType]);
}

/**
 * Función que intercambia los elementos desde una cuarta a una terna.
 * @param position La posición a la que se está moviendo una carta.
 * @param positionMoved La posición desde la que se mueve la carta.
 * @param trips La terna a la que se mueve la carta.
 * @param quads La cuarta desde la que sale la carta.
 * @param setTrips El hook de react para guardar la terna.
 * @param setQuads El hook de react para guardar la cuarta.
 */
export function changeQuadToTrip(
    position: number,
    positionMoved: number,
    trips: CardType[],
    quads: CardType[],
    setTrips: Dispatch<SetStateAction<[CardType, CardType, CardType] | undefined>>,
    setQuads: Dispatch<SetStateAction<[CardType, CardType, CardType, CardType] | undefined>>
): void {
    let backUp: CardType;
    const newTrips: CardType[] = trips.map((t, i) => {
        if (i === position) {
            backUp = t;
            return quads[positionMoved];
        } else {
            return t;
        }
    });
    const newQuads: CardType[] = quads.map((t, i) => {
        if (i === positionMoved) {
            return backUp;
        } else {
            return t;
        }
    });
    setTrips(newTrips as [CardType, CardType, CardType]);
    setQuads(newQuads as [CardType, CardType, CardType, CardType]);
}

/**
 * Función que intercambia los elementos desde una terna a una cuarta.
 * @param position La posición a la que se está moviendo una carta.
 * @param positionMoved La posición desde la que se mueve la carta.
 * @param trips La terna desde la que se mueve la carta.
 * @param quads La cuarta a la que se mueve la carta.
 * @param setTrips El hook de react para guardar la terna.
 * @param setQuads El hook de react para guardar la cuarta.
 */
export function changeTripToQuad(
    position: number,
    positionMoved: number,
    trips: CardType[],
    quads: CardType[],
    setTrips: Dispatch<SetStateAction<[CardType, CardType, CardType] | undefined>>,
    setQuads: Dispatch<SetStateAction<[CardType, CardType, CardType, CardType] | undefined>>
): void {
    let backUp: CardType;
    const newQuads: CardType[] = quads.map((t, i) => {
        if (i === position) {
            backUp = t;
            return trips[positionMoved];
        } else {
            return t;
        }
    });
    const newTrips: CardType[] = trips.map((t, i) => {
        if (i === positionMoved) {
            return backUp;
        } else {
            return t;
        }
    });
    setTrips(newTrips as [CardType, CardType, CardType]);
    setQuads(newQuads as [CardType, CardType, CardType, CardType]);
}

/**
 * Función que intercambia una sobrante con una terna.
 * @param position La posición de la terna a la que se mueve la sobrante.
 * @param trips La terna a la que se intercambia la sobrante.
 * @param kicker La sobrante que está siendo intercambiada.
 * @param setTrips Hook de react para guardar la terna.
 * @param setKicker Hook de react para guardar la sobrante.
 */
export function changeKickerAndTrip(
    position: number,
    trips: CardType[],
    kicker: CardType,
    setTrips: Dispatch<SetStateAction<[CardType, CardType, CardType] | undefined>>,
    setKicker: Dispatch<SetStateAction<CardType | undefined>>
): void {
    let backUp: CardType | undefined = undefined;
    const newTrips: CardType[] = trips.map((t, i) => {
        if (i === position) {
            backUp = t;
            return kicker;
        } else {
            return t;
        }
    });
    setTrips(newTrips as [CardType, CardType, CardType]);
    setKicker(backUp);
}

/**
 * Función que intercambia una sobrante con una cuarta.
 * @param position La posición de la terna a la que se mueve la sobrante.
 * @param quads La cuarta a la que se intercambia la sobrante.
 * @param kicker La sobrante que está siendo intercambiada.
 * @param setQuads Hook de react para guardar la cuarta.
 * @param setKicker Hook de react para guardar la sobrante.
 */
export function changeKickerAndQuad(
    position: number,
    quads: CardType[],
    kicker: CardType,
    setQuads: Dispatch<SetStateAction<[CardType, CardType, CardType, CardType] | undefined>>,
    setKicker: Dispatch<SetStateAction<CardType | undefined>>
): void {
    let backUp: CardType | undefined = undefined;
    const newQuads: CardType[] = quads.map((t, i) => {
        if (i === position) {
            backUp = t;
            return kicker;
        } else {
            return t;
        }
    });
    setQuads(newQuads as [CardType, CardType, CardType, CardType]);
    setKicker(backUp);
}
