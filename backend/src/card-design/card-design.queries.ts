import { PipelineStage } from 'mongoose';

/**
 * Clase en dónde se almacenan todas las queries para acceder
 * a la colección de los diseños de cartas.
 * @class
 * @abstract
 */
export abstract class CardDesignQueries {

	/**
	 * Método que permite construir la query para traer todos los diseños
	 * de carta disponibles.
	 * @param {Set<string>} userCardDesigns Los diseños de carta del usuario que consulta.
	 * @returns {Array<PipelineStage>} La query construída.
	 */
	static getCardDesignsAvailable = (userCardDesigns: Set<string>): Array<PipelineStage> => {
		return [
			{
				'$addFields': {
					'canSelect': {
						'$cond': {
							'if': {
								'$in': [
									'$cardDesignId', Array.from(userCardDesigns),
								],
							},
							'then': true,
							'else': false,
						},
					},
				},
			},
		];
	};
}