import { Connection, HydratedDocument, Model, Schema, SchemaDefinition } from 'mongoose';
import { PlayerDTO } from '../player/player';
import { CardSchema } from './card.schema';
import { FactoryProvider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { DatabaseConstants } from './database.constants';

/**
 * Representa el modelo para interactuar con los jugadores en mongodb.
 */
export type PlayerDocument = HydratedDocument<PlayerDTO>;

/**
 * Representa la definición completa de un jugador en mongodb.
 */
const definition: Required<SchemaDefinition<PlayerDTO>> = {
	cardsMap: {
		of: Number,
		type: Schema.Types.Map,
		required: false,
	},
	gameId: {
		type: String,
		required: true,
		index: 'hashed',
	},
	isActive: {
		type: Boolean,
		required: true,
		index: 'hashed',
	},
	kicker: {
		type: CardSchema,
		required: false,
	},
	playerId: {
		type: String,
		required: true,
		unique: true,
	},
	position: {
		type: Number,
		required: false,
	},
	quads: {
		type: [CardSchema],
		length: 4,
		required: false,
	},
	score: {
		type: Number,
		required: false,
	},
	status: {
		type: String,
		required: true,
	},
	triedToWin: {
		type: Boolean,
		required: true,
	},
	trips1: {
		type: [CardSchema],
		length: 3,
		required: false,
	},
	trips2: {
		type: [CardSchema],
		length: 3,
		required: false,
	},
	userId: {
		type: String,
		required: true,
		index: 'hashed',
	},
};

/**
 * Constante que representa el esquema de los jugadores.
 * @const {Schema<PlayerDTO>}
 */
export const PlayerSchema: Schema<PlayerDTO> = new Schema<PlayerDTO>(definition, {
	timestamps: true,
});

/**
 * Constante que representa la conexión del esquema de los
 * jugadores en la base de datos.
 */
export const PlayerSchemaProvider: FactoryProvider = {
	inject: [getConnectionToken(DatabaseConstants.DATABASE_CONNECTION_NAME)],
	provide: DatabaseConstants.PLAYER_PROVIDER,
	useFactory(connection: Connection): Model<PlayerDocument> {
		return connection.model<PlayerDocument>(
			DatabaseConstants.PLAYER_COLLECTION_NAME, PlayerSchema,
		);
	},
};