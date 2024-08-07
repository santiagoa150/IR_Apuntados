import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MatchService } from '../match.service';
import { MatchController } from '../controller/match.controller';
import { GameModule } from '../../game/config/game.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PlayerModule } from '../../player/config/player.module';

/**
 * Clase que representa el módulo de las partidas y sus respectivas configuraciones.\
 * Configura:
 * - Los servicios de las partidas.
 * @class
 * @module
 */
@Module({
	imports: [
		DatabaseModule,
		CqrsModule,
		forwardRef(() => GameModule),
		forwardRef(() => PlayerModule),
	],
	controllers: [MatchController],
	providers: [MatchService],
	exports: [MatchService],
})
export class MatchModule {
}