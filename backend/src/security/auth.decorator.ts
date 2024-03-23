import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * Decorador que define los decoradores para el acceso a la aplicación.
 *
 * @const
 */
export const AuthDecorator = () => applyDecorators(
	UseGuards(JwtGuard),
	ApiBearerAuth(),
);