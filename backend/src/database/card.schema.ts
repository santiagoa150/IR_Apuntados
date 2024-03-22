import { Schema, SchemaDefinition } from 'mongoose';
import { CardDTO } from '../card/card';

/**
 * Representa la definición completa de una carta en mongodb.
 */
const definition: Required<SchemaDefinition<CardDTO>> = {
	type: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
	suit: {
		type: String,
		required: true,
	},
};

/**
 * Constante que representa el esquema de las cartas.
 */
export const CardSchema: Schema<CardDTO> = new Schema<CardDTO>(definition, { timestamps: false, _id: false });