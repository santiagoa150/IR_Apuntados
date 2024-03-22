import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConstants } from './database.constants';
import { UserSchemaProvider } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { CardDesignSchemaProvider } from './card-design.schema';
import { GameSchemaProvider } from './game.schema';
import { PlayerSchemaProvider } from './player.schema';

/**
 * Clase en dónde se deben colocar las configuraciones relacionadas con
 * la base de datos del proyecto y sus respectivos modelos.\
 * Se configura:
 * - La conexión a la base de datos.
 * - El esquema de los usuarios.
 * - El esquema de diseño de cartas.
 * - El esquema de los juegos.
 * @class
 */
@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URI, {
			connectionName: DatabaseConstants.DATABASE_CONNECTION_NAME,
		}),
	],
	providers: [
		UserSchemaProvider,
		CardDesignSchemaProvider,
		GameSchemaProvider,
		PlayerSchemaProvider,
	],
	exports: [
		MongooseModule,
		UserSchemaProvider,
		CardDesignSchemaProvider,
		GameSchemaProvider,
		PlayerSchemaProvider,
	],
})
export class DatabaseModule {
}