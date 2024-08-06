import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MatchService } from '../match.service';
import { MatchController } from '../controller/match.controller';
import { GameModule } from '../../game/config/game.module';
import { CqrsModule } from '@nestjs/cqrs';

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
		GameModule,
	],
	controllers: [MatchController],
	providers: [MatchService],
	exports: [MatchService],
})
export class MatchModule {
}