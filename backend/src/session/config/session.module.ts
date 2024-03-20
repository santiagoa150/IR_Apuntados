import { Module } from '@nestjs/common';
import { UserModule } from '../../user/config/user.module';
import { SessionController } from '../controller/session.controller';
import { SessionService } from '../session.service';
import { LoginStrategy } from '../guards/login.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/**
 * Clase que representa el módulo de las sesiones y sus
 * respectivas configuraciones.
 * Configura:
 * - Los controladores de las sesiones.
 * - Los servicios de los usuarios.
 * - La estrategía para el inicio de sesión.
 * @class
 */
@Module({
	imports: [
		JwtModule.register({}),
		UserModule,
	],
	controllers: [SessionController],
	providers: [
		LoginStrategy,
		SessionService,
	],
})
export class SessionModule {
}