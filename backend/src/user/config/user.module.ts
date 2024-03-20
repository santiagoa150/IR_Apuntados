import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from '../controller/user.controller';
import { UserService } from '../user.service';

/**
 * Clase que representa el módulo de los usuarios y sus
 * respectivas configuraciones.
 * Configura:
 * - Los controladores de los usuarios.
 * - Los servicios de los usuarios.
 * @class
 */
@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {
}