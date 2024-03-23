import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../../user/config/user.module';
import { SessionController } from '../controller/session.controller';
import { SessionService } from '../session.service';
import { LoginStrategy } from '../guards/login.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/jwt.strategy';
import { GameGuard } from '../guards/game.guard';
import { GameModule } from '../../game/config/game.module';

/**
 * Clase que representa el módulo de seguridad y sus
 * respectivas configuraciones.
 * Configura:
 * - Los controladores de las sesiones.
 * - Los servicios de los usuarios.
 * - La estrategía para el inicio de sesión.
 * - La guardia para los juegos activos.
 * @class
 */
@Module({
	imports: [
		JwtModule.register({ global: true }),
		forwardRef(() => UserModule),
		GameModule,
	],
	controllers: [SessionController],
	providers: [
		LoginStrategy,
		JwtStrategy,
		GameGuard,
		SessionService,
	],
	exports: [SessionService],
})
export class SecurityModule {
}