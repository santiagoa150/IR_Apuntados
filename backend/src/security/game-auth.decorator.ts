import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthDecorator } from './auth.decorator';
import { GameGuard } from './guards/game.guard';

/**
 * Decorador que define los decoradores necesarios
 * para acceder a los recursos de un juego.
 * @constructor
 */
export const GameAuthDecorator = () => applyDecorators(
	AuthDecorator(),
	UseGuards(GameGuard),
);