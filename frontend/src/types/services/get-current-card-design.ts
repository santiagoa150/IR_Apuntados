import {CardDesignType} from '../card-design.type.ts';

/**
 * Definición de la respuesta del servicio para traer
 * el diseño de carta actual.
 */
export type GetCurrentCardDesign = {
    success: boolean,
    design: CardDesignType;
}