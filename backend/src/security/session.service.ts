import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Injectable, Logger } from '@nestjs/common';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { UserId } from '../user/user-id';
import { JwtService } from '@nestjs/jwt';
import { UserDecoratorType } from './user.decorator';
import { ExceptionMessagesConstants } from '../shared/exceptions/exception-messages.constants';

/**
 * Clase que contiene los servicios para interactuar con las
 * sesiones del sistema
 * @class
 */
@Injectable()
export class SessionService {

	private readonly logger: Logger = new Logger(SessionService.name);

	/**
	 * @param {JwtService} jwtService Servicio para generar jwt tokens.
	 * @param {UserService} userService Servicio de los usuarios.
	 */
	constructor(private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {
	}

	/**
	 * Método que permite generar el token de acceso para un usuario.
	 * @param {UserId} userId El id que se guardará en el token.
	 * @returns {string} El token de acceso generado.
	 */
	generateAccessToken(userId: UserId): string {
		const toSign: UserDecoratorType = { userId: userId.toString() };
		return this.jwtService.sign(toSign, {
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.JWT_EXPIRATION_TIME,
		});
	}

	/**
	 * Método que permite generar el token para refrescar el token de acceso de un usuario.
	 * @param {UserId} userId El id que se guardará en el token.
	 * @returns {string} El token de refresco generado.
	 */
	generateRefreshToken(userId: UserId): string {
		const toSign: UserDecoratorType = { userId: userId.toString() };
		return this.jwtService.sign(toSign, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
		});
	}

	/**
	 * Método que permite refrescar el token de acceso de un usuario.
	 * @param {string} refreshToken El token que permite al usuario refrescar su token de acceso.
	 * @return {string} El nuevo token de acceso.
	 */
	refreshAccessToken(refreshToken: string): string {
		try {
			const decoded: UserDecoratorType = this.jwtService.verify(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			});
			return this.generateAccessToken(new UserId(decoded.userId));
		} catch (e) {
			throw new InvalidCredentialsException(ExceptionMessagesConstants.INVALID_REFRESH_TOKEN_ERROR);
		}
	}

	/**
	 * Método que contiene la lógica del inicio de sesión para los
	 * usuarios.
	 * @param {string} username El usuario que solicita el inicio de sesión.
	 * @param {string} password Las credenciales del usuario.
	 * @returns {Promise<User>} Se Retorna el usuario que solicita sesión.
	 * @throws {InvalidCredentialsException} Si las credenciales de sesión de un usuario
	 * son inválidas.
	 */
	async login(username: string, password: string): Promise<User> {
		this.logger.log(`[${this.login.name}] INIT :: username: ${username}`);
		const user: User = await this.userService.getByUsername(username);
		if (!user.password.compare(password)) throw new InvalidCredentialsException();
		this.logger.log(`[${this.login.name}] FINISH ::`);
		return user;
	}
}