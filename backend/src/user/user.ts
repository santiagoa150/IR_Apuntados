import { UserId } from './user-id';
import { UserPassword } from './user-password';
import { UserStatus } from './user-status';
import { DomainBase } from '../shared/domain.base';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa el objeto de transferencia
 * de un usuario.
 * @class
 */
export class UserDTO {
	@ApiProperty() userId: string;
	@ApiProperty() password: string;
	@ApiProperty() status: string;
	@ApiProperty() username: string;
	@ApiProperty() icon: string;
	@ApiProperty() currentDesignId: string;
	@ApiProperty() tokens: number;
}

/**
 * Clase que representa un usuario y sus acciones disponibles.
 *
 * @class
 * @extends {DomainBase<UserDTO>}
 */
export class User extends DomainBase<UserDTO> {
	public readonly password: UserPassword;
	private readonly userId: UserId;
	private readonly status: UserStatus;
	private readonly username: string;
	private readonly icon: string;
	// TODO: Cambiar por el Id del diseño de carta.
	private readonly currentDesignId: string;
	private readonly tokens: number;

	/**
	 * @param {User} userId El ID del usuario.
	 * @param {UserPassword} password La contraseña del usuario.
	 * @param {UserStatus} status El estado del usuario.
	 * @param {string} username El nombre del usuario.
	 * @param {string} icon El icono del usuario.
	 * @param {string} currentDesignId El diseño de cartas actual del usuario.
	 * @param {number} tokens La cantidad de tokens del usuario.
	 */
	constructor(
		userId: UserId,
		password: UserPassword,
		status: UserStatus,
		username: string,
		icon: string,
		currentDesignId: string,
		tokens: number,
	) {
		super();
		this.userId = userId;
		this.password = password;
		this.status = status;
		this.username = username;
		this.icon = icon;
		this.currentDesignId = currentDesignId;
		this.tokens = tokens;
	}

	/**
	 * Convierte el objeto de transferencia de un usuario al modelo
	 * de dominio.
	 * @param {UserDTO} dto El objeto de transferencia.
	 * @returns {User} El modelo de dominio.
	 * @static
	 */
	static fromDTO(dto: UserDTO): User {
		return new User(
			new UserId(dto.userId),
			new UserPassword(dto.password),
			new UserStatus(dto.status),
			dto.username,
			dto.icon,
			dto.currentDesignId,
			dto.tokens,
		);
	}

	/**
	 * Convierte el usuario a su objeto de transferencia.
	 * @returns {UserDTO} El objeto de transferencia del usuario.
	 */
	toDTO(): UserDTO {
		return {
			currentDesignId: this.currentDesignId,
			icon: this.icon,
			password: this.password.toString(),
			status: this.status.toString(),
			tokens: this.tokens,
			userId: this.userId.toString(),
			username: this.username,
		};
	}
}