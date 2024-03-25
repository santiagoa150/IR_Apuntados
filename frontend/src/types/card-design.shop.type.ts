import {CardDesignType} from './card-design.type.ts';

/**
 * Definición de los diseños de carta de la tienda.
 */
export type CardDesignShopType = CardDesignType & {
    canSelect: boolean;
}