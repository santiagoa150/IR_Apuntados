/**
 * @enum {string} Constantes que representan la configuración de
 * los controladores de los diseños de cartas.
 */
export enum CardDesignControllerConstants {
	/**
	 * Prefijo utilizado para todos los controladores de los diseños de cartas.
	 */
	CONTROLLER_PREFIX = 'card-design',
	/**
	 * Tag que agrupa todos los controladores de los diseños de cartas.
	 */
	CONTROLLER_TAG = 'Card Design',
	/**
	 * Url utilizada para el controlador que permite traer los diseños
	 * de cartas activos.
	 */
	GET_ACTIVE_CARD_DESIGNS_URL = 'active',
	/**
	 * Url utilizada para el controlador que permite traer el diseño
	 * actual del usuario.
	 */
	GET_CURRENT_CARD_DESIGN = 'current',
}