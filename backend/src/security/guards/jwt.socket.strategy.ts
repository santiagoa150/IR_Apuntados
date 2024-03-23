import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ExtractJwt } from 'passport-jwt';
import { UserDecoratorType } from '../user.decorator';
import * as process from 'process';

/**
 * Clase que define la estrategia de jwt para los websockets.
 * @class
 */
export class JwtSocketStrategy {

	/**
	 * Método en dónde se define la lógica de la estrategia.
	 * @param {ExecutionContext} context El contexto de ejecución.
	 * @param {JwtService} service El servicio de jwt.
	 */
	static canActivate(context: ExecutionContext, service: JwtService): boolean {
		try {
			const socket: Socket = context.switchToWs().getClient<Socket>();
			const token: string = ExtractJwt.fromAuthHeaderAsBearerToken()(socket.handshake.headers.authorization);
			const payload: UserDecoratorType = service.verify(token, { secret: process.env.JWT_SECRET });
			socket.handshake.query.user = JSON.stringify({ userId: payload.userId });
			return true;
		} catch (e) {
			return false;
		}
	}
}