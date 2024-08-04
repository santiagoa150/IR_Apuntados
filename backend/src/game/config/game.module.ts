import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameService } from '../game.service';
import { GameController } from '../controller/game.controller';
import { UserModule } from '../../user/config/user.module';
import { PlayerModule } from '../../player/config/player.module';
import { GameSocket } from '../socket/game.socket';
import { CqrsModule } from '@nestjs/cqrs';
import Events from '../events';

/**
 * Clase que representa el módulo de los juegos y sus respectivas
 * configuraciones.
 * Configura:
 * - Los controladores de los juegos.
 * - Los servicios de los juegos.
 * @class
 */
@Module({
	imports: [
		DatabaseModule,
		CqrsModule,
		forwardRef(() => UserModule),
		PlayerModule,
	],
	controllers: [GameController],
	providers: [GameService, GameSocket, ...Events],
	exports: [GameService, GameSocket],
})
export class GameModule {
}