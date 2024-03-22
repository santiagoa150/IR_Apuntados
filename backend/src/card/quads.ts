import { Card, CardDTO } from './card';

/**
 * Tipo que representa el objeto de transferencia de una cuarta.
 * @type {[CardDTO, CardDTO, CardDTO, CardDTO]}
 */
export type QuadsDTO = [CardDTO, CardDTO, CardDTO, CardDTO];

/**
 * Tipo que representa una cuarta.
 * @type {[Card, Card, Card, Card]}
 */
export type Quads = [Card, Card, Card, Card];