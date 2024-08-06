/**
 * Definición de los datos de las cartas.
 */
export type CardType = {
    type: string;
    suit: string;
    value: number;
}

/**
 * Definición de los datos de las cartas con diseños.
 */
export type CardWithDesignType = CardType & {
    cardDesignId: string;
    cardDesignName: string;
}