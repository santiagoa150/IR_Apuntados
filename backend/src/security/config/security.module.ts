import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../../user/config/user.module';
import { SessionController } from '../controller/session.controller';
import { SessionService } from '../session.service';
import { LoginStrategy } from '../guards/login.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/jwt.strategy';
import { GameModule } from '../../game/config/game.module';
import { GameGuard } from '../guards/game.guard';

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
		forwardRef(() => GameModule),
	],
	controllers: [SessionController],
	providers: [
		LoginStrategy,
		JwtStrategy,
		SessionService,
		GameGuard,
	],
	exports: [SessionService],
})
export class SecurityModule {
}