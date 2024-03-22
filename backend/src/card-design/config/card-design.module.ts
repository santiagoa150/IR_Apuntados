import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CardDesignService } from '../card-design.service';
import { UserModule } from '../../user/config/user.module';
import { CardDesignController } from '../controller/card-design.controller';

/**
 * Clase que representa el módulo de los diseños de cartas y sus
 * respectivas configuraciones.
 * Configura:
 * - Los controladores de los diseños de cartas.
 * - Los servicios de los diseños de cartas.
 */
@Module({
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
	],
	controllers: [CardDesignController],
	providers: [CardDesignService],
	exports: [CardDesignService],
})
export class CardDesignModule {
}