import { Connection, HydratedDocument, Model, Schema, SchemaDefinition } from 'mongoose';
import { CardDesignDTO } from '../card-design/card-design';
import { FactoryProvider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { DatabaseConstants } from './database.constants';

/**
 * Representa el modelo para interactuar con los diseños de cartas en mongodb.
 */
export type CardDesignDocument = HydratedDocument<CardDesignDTO>;

/**
 * Representa la definición completa de un diseño de carta en mongodb.
 */
const definition: Required<SchemaDefinition<CardDesignDTO>> = {
	cardDesignId: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	isDefault: {
		type: Boolean,
		required: true,
		index: true,
	},
	isFree: {
		type: Boolean,
		required: true,
		index: true,
	},
	isActive: {
		type: Boolean,
		required: true,
		index: true,
	},
	price: {
		type: Number,
		required: false,
	},
	name: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
};

/**
 * Constante que representa el esquema de los diseños de cartas.
 * @const {Schema<CardDesignDTO>}
 */
export const CardDesignSchema: Schema<CardDesignDTO> = new Schema<CardDesignDTO>(definition, { timestamps: true });

/**
 * Constante que representa la conexión del esquema de
 * diseños de cartas en la base de datos.
 */
export const CardDesignSchemaProvider: FactoryProvider = {
	inject: [getConnectionToken(DatabaseConstants.DATABASE_CONNECTION_NAME)],
	provide: DatabaseConstants.CARD_DESIGN_PROVIDER,
	useFactory(connection: Connection): Model<CardDesignDocument> {
		return connection.model<CardDesignDocument>(
			DatabaseConstants.CARD_DESIGN_COLLECTION_NAME, CardDesignSchema,
		);
	},
};