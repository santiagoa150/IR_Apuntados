import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConstants } from './database.constants';
import { UserSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

/**
 * Clase en dónde se deben colocar las configuraciones relacionadas con
 * la base de datos del proyecto y sus respectivos modelos.\
 * Se configura:
 * - La conexión a la base de datos.
 * - El esquema de los usuarios.
 * @class
 */
@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URI, {
			connectionName: DatabaseConstants.DATABASE_CONNECTION_NAME,
		}),
	],
	providers: [UserSchema],
	exports: [MongooseModule, UserSchema],
})
export class DatabaseModule {
}