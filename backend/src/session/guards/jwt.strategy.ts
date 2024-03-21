import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDecoratorType } from '../user.decorator';
import * as process from 'process';

/**
 * Clase en dónde se define la lógica de la guardia que utilizan
 * todos los servicios de la aplicación.
 *
 * @class
 * @extends {extends PassportStrategy(Strategy)}
 */
export class JwtStrategy extends PassportStrategy(Strategy) {

	/**
	 * - Determina de dónde debe extraer el token.
	 * - Determina que no debe ignorar la expiración.
	 * - Determina el secret que debe usar para decodificar el token.
	 */
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	/**
	 * Función que guarda la información del token en el request del usuario.
	 * @param {UserDecoratorType} payload La información extraída del token.
	 * @returns {UserDecoratorType} La información que se almacenará en el request del usuario.s
	 */
	async validate(payload: UserDecoratorType): Promise<UserDecoratorType> {
		return { userId: payload.userId };
	}
}