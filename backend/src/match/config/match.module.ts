import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MatchService } from '../match.service';

/**
 * Clase que representa el módulo de las partidas y sus respectivas configuraciones.\
 * Configura:
 * - Los servicios de las partidas.
 * @class
 * @module
 */
@Module({
	imports: [DatabaseModule],
	providers: [MatchService],
	exports: [MatchService],
})
export class MatchModule {
}