import { Schema, SchemaDefinition } from 'mongoose';
import { DiscardedCardsDTO } from '../match/discarded-cards';
import { CardWithDesignSchema } from './card-with-design.schema';

/**
 * Representa la definición completa de las cartas desechadas en mongodb.
 */
const definition: Required<SchemaDefinition<DiscardedCardsDTO>> = {
	cards: {
		type: [CardWithDesignSchema],
		required: true,
	},
};

/**
 * Constante que representa el esquema de las cartas desechadas.
 */
export const DiscardedCardsSchema: Schema<DiscardedCardsDTO> = new Schema<DiscardedCardsDTO>(
	definition, { timestamps: false, _id: false },
);