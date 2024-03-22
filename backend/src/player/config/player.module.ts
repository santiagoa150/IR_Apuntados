import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PlayerService } from '../player.service';

/**
 * Clase que representa el módulo de los jugadores y sus respectivas
 * configuraciones.
 * Configura:
 * - Los servicios de los jugadores.
 */
@Module({
	imports: [DatabaseModule],
	providers: [PlayerService],
	exports: [PlayerService],
})
export class PlayerModule {
}