import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/config/user.module';

/**
 * Clase que representa el módulo principal de la aplicación.\
 * Configura:
 * - La importación de las variables de entorno.
 * - El módulo de los usuarios.
 * @class
 */
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
	],
})
export class AppModule {
}
