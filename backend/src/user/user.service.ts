import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../database/user.schema';
import { User, UserDTO } from './user';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserId } from './user-id';

/**
 * Clase que contiene los servicios para interactuar con los
 * usuarios del sistema.
 * @class
 */
@Injectable()
export class UserService {

	private readonly logger: Logger = new Logger(UserService.name);

	/**
	 * @param {Model<UserDocument>} model Modelo para interactuar con
	 * la base de datos de los usuarios.
	 */
	constructor(
		private readonly model: Model<UserDocument>,
	) {
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
		const found: UserDTO = await this.model.findOne({ userId: userId.toString() + 'a' });
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
}