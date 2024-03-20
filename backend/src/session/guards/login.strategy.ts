import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SessionService } from '../session.service';
import { UserDTO } from '../../user/user';
import { Injectable } from '@nestjs/common';

/**
 * Clase en dónde se define la lógica para realizar el
 * inicio de sesión de la aplicación.
 * @class
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {

	/**
	 * Define:
	 * - El parámetro de inicio de sesión para la estrategía.
	 * @param {SessionService} service Servicio para manejar sesiones.
	 */
	constructor(private readonly service: SessionService) {
		super({ usernameField: 'username' });
	}

	/**
	 * Método que define la lógica para el inicio de sesión de la aplicación.
	 *
	 * @param {string} username El nombre de usuario de quién inicia sesión.
	 * @param {string} password La contraseña de quién inicia sesión.
	 * @returns {Promise<UserDTO | undefined>} Retorna el usuario si las credenciales son válidas, por
	 * el contrário retorna undefined.
	 */
	async validate(username: string, password: string): Promise<UserDTO | undefined> {
		try {
			return (await this.service.login(username, password)).toDTO();
		} catch (e) {
			return undefined;
		}
	}
}