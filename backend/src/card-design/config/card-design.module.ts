import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CardDesignService } from '../card-design.service';

/**
 * Clase que representa el módulo de los diseños de cartas y sus
 * respectivas configuraciones.
 * Configura:
 * - Los servicios de los diseños de cartas.
 */
@Module({
	imports: [DatabaseModule],
	providers: [CardDesignService],
	exports: [CardDesignService],
})
export class CardDesignModule {
}