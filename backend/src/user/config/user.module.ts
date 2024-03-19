import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

/**
 * Clase que representa el módulo de los usuarios y sus
 * respectivas configuraciones.
 * @class
 */
@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {
}