import { GameId } from '../game/game-id';
import { PipelineStage } from 'mongoose';

/**
 * Clase en dónde se almacenan todas las queries para acceder
 * a la colección de los jugadores.
 * @class
 * @abstract
 */
export abstract class PlayerQueries {

	/**
	 * Método que permite construir la query para traer todos los jugadores
	 * de un juego con la información de sus usuarios.
	 * @param {GameId} gameId El juego que se consulta.
	 * @returns {Array<PipelineStage>} La query construida.
	 */
	static getWithUserByGame = (gameId: GameId): Array<PipelineStage> => {
		return [
			{
				'$match': {
					'gameId': gameId.toString(),
				},
			}, {
				'$lookup': {
					'from': 'users',
					'localField': 'userId',
					'foreignField': 'userId',
					'as': 'user',
				},
			}, {
				'$unwind': {
					'path': '$user',
					'preserveNullAndEmptyArrays': false,
				},
			}, {
				'$lookup': {
					'from': 'card-designs',
					'localField': 'user.currentDesignId',
					'foreignField': 'cardDesignId',
					'as': 'cardDesign',
				},
			}, {
				'$unwind': {
					'path': '$cardDesign',
					'preserveNullAndEmptyArrays': false,
				},
			}, {
				'$project': {
					'playerId': '$playerId',
					'userId': '$userId',
					'username': '$user.username',
					'icon': '$user.icon',
					'status': '$status',
					'position': '$position',
					'score': '$score',
					'isActive': '$isActive',
					'cardDesignId': '$cardDesign.cardDesignId',
					'cardDesignName': '$cardDesign.name',
				},
			},
		];
	};
}