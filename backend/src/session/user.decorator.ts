import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Tipo que representa la información extraída en el decorador del usuario.
 * @type { userId: string }
 */
export type UserDecoratorType = { userId: string; }

/**
 * Decorador que extrae la información del usuario del request después
 * de validar el token.
 * @const
 */
export const UserDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): UserDecoratorType => {
		switch (ctx.getType()) {
		case 'http': {
			const request = ctx.switchToHttp().getRequest();
			return request.user;
		}
		case 'ws': {
			const query = ctx.switchToWs().getClient().handshake.query;
			return JSON.parse(query.user);
		}
		}
	},
);