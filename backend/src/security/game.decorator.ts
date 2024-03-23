import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDecoratorType } from './user.decorator';

/**
 * Decorador que extrae la información del juego del request después
 * de validar la guardia.
 * @const
 */
export const GameDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): UserDecoratorType => {
		switch (ctx.getType()) {
		case 'http': {
			const request = ctx.switchToHttp().getRequest();
			return request.game;
		}
		case 'ws': {
			const query = ctx.switchToWs().getClient().handshake.query;
			return JSON.parse(query.game);
		}
		}
	},
);