import { Module } from '@nestjs/common';
import { UserModule } from '../../user/config/user.module';
import { SessionController } from '../controller/session.controller';
import { SessionService } from '../session.service';
import { LoginStrategy } from '../guards/login.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/jwt.strategy';

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
		JwtModule.register({ global: true }),
		UserModule,
	],
	controllers: [SessionController],
	providers: [
		LoginStrategy,
		JwtStrategy,
		SessionService,
	],
})
export class SessionModule {
}