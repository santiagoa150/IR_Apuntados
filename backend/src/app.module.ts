import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/config/user.module';
import { SessionModule } from './session/config/session.module';
import { CardDesignModule } from './card-design/config/card-design.module';

/**
 * Clase que representa el módulo principal de la aplicación.\
 * Configura:
 * - La importación de las variables de entorno.
 * - El módulo de los usuarios.
 * - El módulo de las sesiones.
 * - El módulo de los diseños de cartas.
 * @class
 */
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		SessionModule,
		CardDesignModule,
	],
})
export class AppModule {
}
