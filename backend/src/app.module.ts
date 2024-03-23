import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/config/user.module';
import { SecurityModule } from './security/config/security.module';
import { CardDesignModule } from './card-design/config/card-design.module';
import { GameModule } from './game/config/game.module';
import { PlayerModule } from './player/config/player.module';

/**
 * Clase que representa el módulo principal de la aplicación.\
 * Configura:
 * - La importación de las variables de entorno.
 * - El módulo de los usuarios.
 * - El módulo de las sesiones.
 * - El módulo de los diseños de cartas.
 * - El módulo de los juegos.
 * - El módulo de los jugadores.
 * @class
 */
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		SecurityModule,
		CardDesignModule,
		GameModule,
		PlayerModule,
	],
})
export class AppModule {
}
