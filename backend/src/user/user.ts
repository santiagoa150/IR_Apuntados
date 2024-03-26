import { UserId } from './user-id';
import { UserPassword } from './user-password';
import { UserStatus } from './user-status';
import { DomainBase } from '../shared/domain.base';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CardDesignId } from '../card-design/card-design-id';
import { UserIcon } from './user-icon';
import { UserStatusConstants } from './user-status.constants';
import { UserIsAlreadyPlayingException } from './exceptions/user-is-already-playing.exception';
import { NotEnoughTokensException } from './exceptions/not-enough-tokens.exception';

/**
 * Clase que representa el objeto de transferencia
 * de un usuario.
 * @class
 */
export class UserDTO {
	@ApiProperty() userId: string;
	@ApiHideProperty() password: string;
	@ApiProperty() status: string;
	@ApiProperty() username: string;
	@ApiProperty() icon: string;
	@ApiProperty() currentDesignId: string;
	@ApiProperty() tokens: number;
	@ApiHideProperty() cardDesigns: Array<string>;
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
	private tokens: number;

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

	/**
	 * Método que permite cambiar el estado de un usuario, haciendo las
	 * respectivas validaciones.
	 * @param {UserStatusConstants} status El nuevo estado del usuario.
	 * @throws {UserIsAlreadyPlayingException} Si lanza si un usuario ya está jugando y se intenta ingresar a un juego.
	 */
	changeStatus(
		status: UserStatusConstants,
	): void {
		switch (status) {
			case UserStatusConstants.PLAYING: {
				if (this.status.is(UserStatusConstants.PLAYING)) throw new UserIsAlreadyPlayingException();
				break;
			}
		}
		this.status.change(status);
	}

	/**
	 * Método que permite restar tokens a un usuario, haciendo las
	 * respectivas validaciones.
	 * @param {number} value La cantidad de tokens a restar.
	 * @throws {NotEnoughTokensException} Se lanza si la cantidad que se desea restar
	 * supera la cantidad de tokens disponibles.
	 */
	removeTokens(value: number): void {
		if (value < 0) value = -value;
		value = Math.trunc(value);
		if (value > this.tokens) throw new NotEnoughTokensException();
		this.tokens -= value;
	}

}