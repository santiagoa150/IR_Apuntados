import { Connection, HydratedDocument, Model, Schema, SchemaDefinition } from 'mongoose';
import { GameDTO } from '../game/game';
import { FactoryProvider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { DatabaseConstants } from './database.constants';

/**
 * Representa el model para interactuar con los juegos de mongodb.
 */
export type GameDocument = HydratedDocument<GameDTO>;

/**
 * Representa la definición completa de un juego en mongodb.
 */
const definition: Required<SchemaDefinition<GameDTO>> = {
	code: {
		type: String,
		required: true,
		index: true,
	},
	name: {
		type: String,
		required: true,
	},
	isPublic: {
		type: Boolean,
		required: true,
		index: true,
	},
	status: {
		type: String,
		required: true,
		index: true,
	},
	betByPlayer: {
		type: Number,
		required: true,
	},
	currentPlayers: {
		type: Number,
		required: true,
	},
	requiredPlayers: {
		type: Number,
		required: true,
	},
	gameId: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	creatorId: {
		type: String,
		required: true,
		index: true,
	},
};

/**
 * Constante que representa la definición y conexión del esquema de
 * juegos en la base de datos.
 * @type {FactoryProvider}
 */
export const GameSchema: FactoryProvider = {
	inject: [getConnectionToken(DatabaseConstants.DATABASE_CONNECTION_NAME)],
	provide: DatabaseConstants.GAME_PROVIDER,
	useFactory(connection: Connection): Model<GameDocument> {
		return connection.model<GameDocument>(
			DatabaseConstants.GAME_COLLECTION_NAME,
			new Schema<GameDTO>(definition, { timestamps: true }),
		);
	},
};