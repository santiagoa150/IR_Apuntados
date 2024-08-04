import { AuthGuard } from '@nestjs/passport';
import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtSocketStrategy } from './jwt.socket.strategy';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '../../shared/exceptions/unauthorized.exception';

/**
 * Clase que define la lógica de la guardia de jwt para los diferentes contextos
 * de ejecución del sistema
 *
 * @class
 * @extends {AuthGuard('jwt')}
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

	/**
	 * @param {JwtService} service Servicio para interactuar con jwt.
	 */
	constructor(private readonly service: JwtService) {
		super();
	}

	/**
	 * Método principal de la lógica de la guardia.
	 * @param {ExecutionContext} context El contexto de ejecución.
	 * @throws {UnauthorizedException} Cuando el usuario no tiene acceso al recurso.
	 */
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		let result: boolean;
		switch (context.getType<ContextType>()) {
		case 'http':
			return super.canActivate(context);
		case 'ws':
			result = JwtSocketStrategy.canActivate(context, this.service);
			break;
		default:
			result = false;
		}
		if (!result) throw new UnauthorizedException();
		return result;
	}
}