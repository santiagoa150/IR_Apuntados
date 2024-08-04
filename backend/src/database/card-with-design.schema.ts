import { Schema, SchemaDefinition } from 'mongoose';
import { CardWithDesignDTO } from '../card/card-with-design';

/**
 * Representa la definición completa de una carta con diseño en mongodb.
 */
export const definition: Required<SchemaDefinition<CardWithDesignDTO>> = {
	cardDesignId: {
		type: String,
		required: true,
	},
	cardDesignName: {
		type: String,
		required: true,
	},
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
 * Constante que representa el esquema de las cartas con diseño.
 */
export const CardWithDesignSchema: Schema<CardWithDesignDTO> = new Schema<CardWithDesignDTO>(definition, {
	timestamps: false,
	_id: false,
});