import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../database/user.schema';

/**
 * Clase que contiene los servicios para interactuar con los
 * usuarios del sistema.
 * @class
 */
@Injectable()
export class UserService {

	/**
	 * @param {Model<UserDocument>} model Modelo para interactuar con
	 * la base de datos de los usuarios.
	 */
	constructor(
		private readonly model: Model<UserDocument>,
	) {
	}
}