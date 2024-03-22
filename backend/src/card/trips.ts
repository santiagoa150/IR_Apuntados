import { Card, CardDTO } from './card';

/**
 * Tipo que representa el objeto de transferencia de una terna.
 * @type {[CardDTO, CardDTO, CardDTO]}
 */
export type TripsDTO = [CardDTO, CardDTO, CardDTO];

/**
 * Tipo que representa una terna.
 * @type {[Card, Card, Card]}
 */
export type Trips = [Card, Card, Card];