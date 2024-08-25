import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserDecoratorType } from '../user.decorator';
import * as process from 'process';

/**
 * Clase que define la estrategia de jwt para los websockets.
 * @class
 */
export class JwtSocketStrategy {

	/**
	 * Función en dónde se define la lógica de la estrategia.
	 * @param {ExecutionContext} context El contexto de ejecución.
	 * @param {JwtService} service El servicio de jwt.
	 */
	static canActivate(context: ExecutionContext, service: JwtService): boolean {
		const socket: Socket = context.switchToWs().getClient<Socket>();
		try {
			const rawToken: string = socket.handshake.headers.authorization as string;
			if (!rawToken || !rawToken.startsWith('Bearer')) return false;
			const parts: string[] = rawToken.split(' ');
			if (parts.length != 2) return false;
			const token: string = parts[1];
			const payload: UserDecoratorType = service.verify(token, { secret: process.env.JWT_SECRET });
			socket.handshake.query.user = JSON.stringify({ userId: payload.userId });
			return true;
		} catch (e) {
			return false;
		}
	}
}