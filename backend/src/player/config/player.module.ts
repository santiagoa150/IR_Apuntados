import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PlayerService } from '../player.service';
import { PlayerController } from '../controller/player.controller';
import { GameModule } from '../../game/config/game.module';
import { UserModule } from '../../user/config/user.module';

/**
 * Clase que representa el módulo de los jugadores y sus respectivas
 * configuraciones.
 * Configura:
 * - Los servicios de los jugadores.
 */
@Module({
	controllers: [PlayerController],
	imports: [
		DatabaseModule,
		forwardRef(() => GameModule),
		forwardRef(() => UserModule),
	],
	providers: [PlayerService],
	exports: [PlayerService],
})
export class PlayerModule {
}