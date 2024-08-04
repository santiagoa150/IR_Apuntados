import { Schema, SchemaDefinition } from 'mongoose';
import { CardDeckDTO } from '../match/card-deck';
import { CardSchema } from './card.schema';

/**
 * Representa la definición completa de una mazo de cartas en mongodb.
 */
const definition: Required<SchemaDefinition<CardDeckDTO>> = {
	cards: {
		required: true,
		type: [CardSchema],
	},
};

/**
 * Constante que representa el esquema de los mazos de cartas.
 */
export const CardDeckSchema: Schema<CardDeckDTO> = new Schema<CardDeckDTO>(definition, {
	timestamps: false,
	_id: false,
});