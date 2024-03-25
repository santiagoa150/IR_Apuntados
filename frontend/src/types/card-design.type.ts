/**
 * Definición de los diseños de cartas del sistema.
 */
export type CardDesignType = {
    cardDesignId: string;
    name: string;
    isDefault: boolean;
    isActive: boolean;
    isFree: boolean;
    price?: number;
}