import { UserDTO } from '../user/user';
import { Connection, HydratedDocument, Model, Schema, SchemaDefinition } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { DatabaseConstants } from './database.constants';

/**
 * Representa el modelo para interactuar con los usuarios en mongodb.
 */
export type UserDocument = HydratedDocument<UserDTO>;

/**
 * Representa la definición completa de un usuario en mongodb.
 */
const definition: Required<SchemaDefinition<UserDTO>> = {
	cardDesigns: {
		type: [String],
		required: true,
	},
	currentDesignId: {
		type: String,
		required: true,
	},
	currentDesignName: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		index: true,
	},
	tokens: {
		type: Number,
		required: true,
	},
	userId: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		index: true,
	},
};

/**
 * Constante que representa el esquema de los usuarios.
 * @const {Schema<UserDTO>}
 */
export const UserSchema: Schema<UserDTO> = new Schema<UserDTO>(definition, { timestamps: true });

/**
 * Constante que representa la conexión del esquema
 * de usuarios en la base de datos.
 * @type {FactoryProvider}
 */
export const UserSchemaProvider: FactoryProvider = {
	inject: [getConnectionToken(DatabaseConstants.DATABASE_CONNECTION_NAME)],
	provide: DatabaseConstants.USER_PROVIDER,
	useFactory(connection: Connection): Model<UserDocument> {
		return connection.model<UserDocument>(
			DatabaseConstants.USER_COLLECTION_NAME, UserSchema,
		);
	},
};