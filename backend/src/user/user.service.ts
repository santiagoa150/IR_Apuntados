import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../database/user.schema';
import { User, UserDTO } from './user';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

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
	async findByUsername(username: string, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
		this.logger.log(`[${this.findByUsername.name}] INIT :: username: ${username}`);
		const found: UserDTO = await this.model.findOne({ username });
		const mapped: User = found ? User.fromDTO(found) : undefined;
		if (throwExceptionIfNotFound && !mapped) throw new UserNotFoundException();
		this.logger.log(`[${this.findByUsername.name}] FINISH ::`);
		return mapped;
	}
}