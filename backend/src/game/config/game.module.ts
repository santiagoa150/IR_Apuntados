import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameService } from '../game.service';
import { GameController } from '../controller/game.controller';

/**
 * Clase que representa el módulo de los juegos y sus respectivas
 * configuraciones.
 * Configura:
 * - Los controladores de los juegos.
 * - Los servicios de los juegos.
 * @class
 */
@Module({
	imports: [DatabaseModule],
	controllers: [GameController],
	providers: [GameService],
})
export class GameModule {
}