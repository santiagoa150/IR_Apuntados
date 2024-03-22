import { UserId } from './user-id';
import { UserPassword } from './user-password';
import { UserStatus } from './user-status';
import { DomainBase } from '../shared/domain.base';
import { ApiProperty } from '@nestjs/swagger';
import { CardDesignId } from '../card-design/card-design-id';
import { UserIcon } from './user-icon';

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
	@ApiProperty() cardDesigns: Array<string>;
}

/**
 * Clase que representa un usuario y sus acciones disponibles.
 *
 * @class
 * @extends {DomainBase<UserDTO>}
 */
export class User extends DomainBase<UserDTO> {
	public readonly password: UserPassword;
	public readonly userId: UserId;
	public currentDesignId: CardDesignId;
	public readonly cardDesigns: Set<string>;
	private readonly status: UserStatus;
	private readonly username: string;
	private readonly icon: UserIcon;
	private readonly tokens: number;

	/**
	 * @param {User} userId El ID del usuario.
	 * @param {UserPassword} password La contraseña del usuario.
	 * @param {UserStatus} status El estado del usuario.
	 * @param {CardDesignId} currentDesignId El diseño de cartas actual del usuario.
	 * @param {string} username El nombre del usuario.
	 * @param {UserIcon} icon El icono del usuario.
	 * @param {number} tokens La cantidad de tokens del usuario.
	 * @param {string} cardDesigns Los diseños de cartas comprados por el usuario.
	 */
	constructor(
		userId: UserId,
		password: UserPassword,
		status: UserStatus,
		currentDesignId: CardDesignId,
		username: string,
		icon: UserIcon,
		tokens: number,
		cardDesigns: Set<string>,
	) {
		super();
		this.userId = userId;
		this.password = password;
		this.status = status;
		this.currentDesignId = currentDesignId;
		this.username = username;
		this.icon = icon;
		this.tokens = tokens;
		this.cardDesigns = cardDesigns;
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
			new CardDesignId(dto.currentDesignId),
			dto.username,
			new UserIcon(dto.icon),
			dto.tokens,
			new Set<string>(dto.cardDesigns),
		);
	}

	/**
	 * Convierte el usuario a su objeto de transferencia.
	 * @returns {UserDTO} El objeto de transferencia del usuario.
	 */
	toDTO(): UserDTO {
		return {
			cardDesigns: Array.from(this.cardDesigns),
			currentDesignId: this.currentDesignId.toString(),
			icon: this.icon.toString(),
			password: this.password.toString(),
			status: this.status.toString(),
			tokens: this.tokens,
			userId: this.userId.toString(),
			username: this.username,
		};
	}
}