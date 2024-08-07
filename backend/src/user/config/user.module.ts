import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from '../controller/user.controller';
import { UserService } from '../user.service';
import { SecurityModule } from '../../security/config/security.module';
import { CardDesignModule } from '../../card-design/config/card-design.module';

/**
 * Clase que representa el módulo de los usuarios y sus
 * respectivas configuraciones.
 * Configura:
 * - Los controladores de los usuarios.
 * - Los servicios de los usuarios.
 * @class
 */
@Module({
	imports: [
		DatabaseModule,
		forwardRef(() => SecurityModule),
		CardDesignModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {
}