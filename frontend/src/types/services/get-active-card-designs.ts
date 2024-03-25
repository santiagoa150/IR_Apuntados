import {CardDesignShopType} from '../card-design.shop.type.ts';

/**
 * Definición de la respuesta del servicio para traer
 * los diseños de cartas activos.
 */
export type GetActiveCardDesigns = {
    success: boolean,
    data: Array<CardDesignShopType>;
}