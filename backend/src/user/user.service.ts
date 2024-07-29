import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../database/user.schema';
import { User, UserDTO } from './user';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserId } from './user-id';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserPassword } from './user-password';
import { CardDesignService } from '../card-design/card-design.service';
import { CardDesign } from '../card-design/card-design';
import { UserStatusConstants } from './user-status.constants';
import * as process from 'process';
import { DatabaseConstants } from '../database/database.constants';
import { CardDesignId } from '../card-design/card-design-id';
import { UserNotUpdatedException } from './exceptions/user-not-updated.exception';
import {
	CardDesignWithoutPurchasingException,
} from '../card-design/exceptions/card-design-without-purchasing.exception';
import { UserIcon } from './user-icon';

/**
 * Clase que contiene los servicios para interactuar con los
 * usuarios del sistema.
 * @class
 */
@Injectable()
export class UserService {

	private readonly logger: Logger = new Logger(UserService.name);

	/**
	 * @param {CardDesignService} cardDesignService Los servicios para interactuar
	 * con los diseños de carta.
	 * @param {Model<UserDocument>} model Modelo para interactuar con
	 * la base de datos de los usuarios.
	 */
	constructor(
		private readonly cardDesignService: CardDesignService,
		@Inject(DatabaseConstants.USER_PROVIDER) private readonly model: Model<UserDocument>,
	) {
	}

	/**
	 * Método que permite crear un usuario.
	 * @param {string} username El nombre de usuario.
	 * @param {string} password La contraseña del usuario.
	 * @returns {Promise<User>} El usuario creado.
	 * @throws {UserAlreadyExistsException} Se lanza cuando se intenta crear un usuario que ya existe.
	 */
	async create(username: string, password: string): Promise<User> {
		this.logger.log(`[${this.create.name}] INIT :: username: ${username}`);
		if ((await this.getByUsername(username, false))) throw new UserAlreadyExistsException();
		UserPassword.validate(password);
		const defaultDesign: CardDesign = await this.cardDesignService.getDefault();
		const user: User = User.fromDTO({
			userId: UserId.create(),
			password: UserPassword.hash(password),
			status: UserStatusConstants.ACTIVE,
			tokens: Number(process.env.APP_DEFAULT_TOKENS),
			currentDesignId: defaultDesign.cardDesignId.toString(),
			currentDesignName: defaultDesign.name,
			icon: UserIcon.generate(),
			username: username,
			cardDesigns: [],
		});
		await new this.model(user.toDTO()).save();
		this.logger.log(`[${this.create.name}] FINISH ::`);
		return user;
	}

	/**
	 * Método que permite buscar un usuario por su id y validar su existencia.
	 * @param {UserId} userId El usuario que se solicita.
	 * @param {boolean} [throwExceptionIfNotFound=true] Bandera para determinar si se debe lanzar
	 * una excepción cuando el usuario solicitado no existe.
	 * @returns {Promise<User | undefined>} Se retorna el usuario solicitado cuando se encuentra,
	 * si la bandera throwExceptionIfNotFound=false y el usuario solicitado no existe se retorna undefined.
	 * @throws {UserNotFoundException} Se lanza cuando la bandera throwExceptionIfNotFound=true y el usuario solicitado
	 * no existe.
	 */
	async getById(userId: UserId, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
		this.logger.log(`[${this.getById.name}] INIT :: userId: ${userId.toString()}`);
		const found: UserDTO = await this.model.findOne({ userId: userId.toString() });
		const mapped: User = found ? User.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new UserNotFoundException();
		this.logger.log(`[${this.getById.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Método que permite buscar un usuario por su username y validar
	 * su existencia.
	 * @param {string} username El usuario que se solicita.
	 * @param {boolean} [throwExceptionIfNotFound=true] Bandera para determinar si se debe lanzar
	 * una excepción cuando el usuario solicitado no existe.
	 * @returns {Promise<User | undefined>} Se retorna el usuario solicitado cuando se encuentra,
	 * si la bandera throwExceptionIfNotFound=false y el usuario solicitado no existe se retorna undefined.
	 * @throws {UserNotFoundException} Se lanza cuando la bandera throwExceptionIfNotFound=true y el usuario solicitado
	 * no existe.
	 */
	async getByUsername(username: string, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
		this.logger.log(`[${this.getByUsername.name}] INIT :: username: ${username}`);
		const found: UserDTO = await this.model.findOne({ username });
		const mapped: User = found ? User.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new UserNotFoundException();
		this.logger.log(`[${this.getByUsername.name}] FINISH ::`);
		return mapped;
	}

	/**
	 * Método que permite actualizar toda la información de un usuario.
	 * @param {User} user El usuario que se está actualizando
	 * @return {User} El usuario actualizado.
	 * @throws {UserNotUpdatedException} Se lanza cuando la solicitud de actualización no se
	 * pudo realizar.
	 */
	async update(user: User): Promise<User> {
		this.logger.log(`[${this.update.name}] INIT :: updating: ${user.userId.toString()}`);
		const updated: UserDTO = await this.model.findOneAndUpdate(
			{ userId: user.userId.toString() },
			user.toDTO(),
			{ new: true },
		);
		const mapped: User = updated ? User.fromDTO(updated) : undefined;
		if (!mapped) throw new UserNotUpdatedException();
		this.logger.log(`[${this.update.name}] FINISH :: `);
		return mapped;
	}

	/**
	 * Método que permite actualizar el diseño de carta de un usuario.
	 * @param {UserId} userId El usuario que se quiere actualizar.
	 * @param {CardDesignId} cardDesignId El diseño de carta que se quiere actualizar.
	 * @returns {Promise<User>} El usuario actualizado.
	 */
	async updateCardDesign(userId: UserId, cardDesignId: CardDesignId): Promise<User> {
		this.logger.log(`[${this.updateCardDesign.name}] INIT :: userId: ${userId.toString()}`);
		const user: User = await this.getById(userId);
		const cardDesign: CardDesign = await this.cardDesignService.getActiveById(cardDesignId);
		if (!cardDesign.isFree && !user.cardDesigns.has(cardDesignId.toString())) {
			throw new CardDesignWithoutPurchasingException();
		}
		user.currentDesignId = cardDesign.cardDesignId;
		user.currentDesignName = cardDesign.name;
		const updated: User = await this.update(user);
		this.logger.log(`[${this.updateCardDesign.name}] FINISH ::`);
		return updated;
	}

	/**
	 * Método que permite actualizar el icono de un usuario.
	 * @param userId El usuario que se quiere actualizar.
	 * @param userIcon El nuevo icono del usuario.
	 * @returns El usuario actualizado.
	 */
	async updateIcon(userId: UserId, userIcon: UserIcon): Promise<User> {
		this.logger.log(`[${this.updateIcon.name}] INIT :: userId: ${userId?.toString()}`);
		const user: User = await this.getById(userId);
		user.icon = userIcon;
		const updated: User = await this.update(user);
		this.logger.log(`[${this.updateIcon.name}] FINISH ::`);
		return updated;
	}
}