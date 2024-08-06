/**
 * @enum {string} Los mensajes de error de la aplicación.
 * @readonly
 */
export enum ExceptionMessagesConstants {
	/**
	 * Se utiliza cuando se solicita el parámetro "betByPlayer" y no se envía.
	 */
	BET_BY_PLAYER_IS_REQUIRED_ERROR = 'BET_BY_PLAYER_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida el parámetro "betByPlayer" y no es un número válido.
	 */
	BET_BY_PLAYER_MUST_BE_A_INTEGER_ERROR = 'BET_BY_PLAYER_MUST_BE_A_INTEGER_ERROR',
	/**
	 * Se utiliza cuando se valida el parámetro "betByPlayer" y no cumple con el
	 * rango especificado por el sistema.
	 */
	BET_BY_PLAYER_MUST_BE_GREATER_THAN_0_ERROR = 'BET_BY_PLAYER_MUST_BE_GREATER_THAN_0_ERROR',
	/**
	 * Se utiliza cuando se solicita el parámetro "cardDesignId" y no se envía.
	 */
	CARD_DESIGN_ID_IS_REQUIRED_ERROR = 'CARD_DESIGN_ID_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando el ID de un diseño de carta y no es
	 * de tipo string.
	 */
	CARD_DESIGN_ID_MUST_BE_A_STRING_ERROR = 'CARD_DESIGN_ID_MUST_BE_A_STRING_ERROR',
	/**
	 * Se utiliza cuando se solicita un diseño de carta que no existe.
	 */
	CARD_DESIGN_NOT_FOUND_ERROR = 'CARD_DESIGN_NOT_FOUND_ERROR',
	/**
	 * Se utiliza cuando se intenta usar un diseño de carta que
	 * no ha sido comprado.
	 */
	CARD_DESIGN_WITHOUT_PURCHASING_ERROR = 'CARD_DESIGN_WITHOUT_PURCHASING_ERROR',
	/**
	 * Se utiliza cuando se solicita el diseño de cartas que no existe.
	 */
	DEFAULT_CARD_DESIGN_NOT_FOUND_ERROR = 'DEFAULT_CARD_DESIGN_NOT_FOUND_ERROR',
	/**
	 * Se utiliza cuando no se puede iniciar un juego.
	 */
	GAME_CANNOT_BE_STARTED_ERROR = 'GAME_CANNOT_BE_STARTED_ERROR',
	/**
	 * Se utiliza cuando se intenta agregar un jugador a un juego que ya está lleno.
	 */
	GAME_EXCEEDS_ITS_PLAYER_COUNT_ERROR = 'GAME_EXCEEDS_ITS_PLAYER_COUNT_ERROR',
	/**
	 * Se utiliza cuando se intenta ingresar a un juego que
	 * ya fué iniciado.
	 */
	GAME_IS_ALREADY_STARTED = 'GAME_IS_ALREADY_STARTED',
	/**
	 * Se utiliza cuando se solicita el ID de un juego y no se envía.
	 */
	GAME_ID_IS_REQUIRED_ERROR = 'GAME_ID_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida el ID de un juego y no es un string.
	 */
	GAME_ID_MUST_BE_A_STRING_ERROR = 'GAME_ID_MUST_BE_A_STRING_ERROR',
	/**
	 * Se utiliza cuando se intenta acceder a los recursos de un juego
	 * que ya fué finalizado.
	 */
	GAME_IS_ALREADY_FINISHED_ERROR = 'GAME_IS_ALREADY_FINISHED_ERROR',
	/**
	 * Se utiliza cuando se solicita el nombre de un juego y no se envía.
	 */
	GAME_NAME_IS_REQUIRED_ERROR = 'GAME_NAME_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida el nombre de un juego y no es un string.
	 */
	GAME_NAME_MUST_BE_A_STRING_ERROR = 'GAME_NAME_MUST_BE_A_STRING_ERROR',
	/**
	 * Se utiliza cuando se solicita un juego que no existe.
	 */
	GAME_NOT_FOUND_ERROR = 'GAME_NOT_FOUND_ERROR',
	/**
	 * Se utiliza cuando se solicita la actualización de un juego,
	 * pero algo falla.
	 */
	GAME_NOT_UPDATED_ERROR = 'GAME_NOT_UPDATED_ERROR',
	/**
	 * Se utiliza cuando se quiere expresar un error del servidor que
	 * no debe ser comunicado al usuario final.
	 */
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
	/**
	 * Se utiliza cuando un ID de diseño de carta no cumple con las características
	 * requeridas por el sistema.
	 */
	INVALID_CARD_DESIGN_ID_ERROR = 'INVALID_CARD_DESIGN_ID_ERROR',
	/**
	 * Se utiliza cuando la pinta de una carta no se encuentra en el
	 * archivo de constantes.
	 */
	INVALID_CARD_SUIT_ERROR = 'INVALID_CARD_SUIT_ERROR',
	/**
	 * Se utiliza cuando el tipo de una carta no se encuentra en
	 * el archivo de constantes.
	 */
	INVALID_CARD_TYPE_ERROR = 'INVALID_CARD_TYPE_ERROR',
	/**
	 * Se utiliza cuando las credenciales de inicio de sesión de un usuario no
	 * son válidas.
	 */
	INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
	/**
	 * Se utiliza cuando un ID de un juego no cumple con las
	 * características requeridas por el sistema.
	 */
	INVALID_GAME_ID_ERROR = 'INVALID_GAME_ID_ERROR',
	/**
	 * Se utiliza cuando la cantidad de jugadores requeridos
	 * para un juego no es válida.
	 */
	INVALID_GAME_REQUIRED_PLAYERS_ERROR = 'INVALID_GAME_REQUIRED_PLAYERS_ERROR',
	/**
	 * Se utiliza cuando el estado de un juego no se encuentra en
	 * el archivo de constantes.
	 */
	INVALID_GAME_STATUS_ERROR = 'INVALID_GAME_STATUS_ERROR',
	/**
	 * Se utiliza cuando el ID de una partida no cumple con las características requeridas por el sistema.
	 */
	INVALID_MATCH_ID_ERROR = 'INVALID_MATCH_ID_ERROR',
	/**
	 * Se utiliza para indicar que el estado de una partida no es válido.
	 */
	INVALID_MATCH_STATUS_ERROR = 'INVALID_MATCH_STATUS_ERROR',
	/**
	 * Se utiliza cuando la contraseña de un usuario no cumple con
	 * las características requeridas por el sistema.
	 */
	INVALID_PASSWORD_ERROR = 'INVALID_PASSWORD_ERROR',
	/**
	 * Se utiliza cuando un ID de un jugador no cumple con las características
	 * requeridas por el sistema.
	 */
	INVALID_PLAYER_ID_ERROR = 'INVALID_PLAYER_ID_ERROR',
	/**
	 * Se utiliza cuando el estado de un jugador no es válido.
	 */
	INVALID_PLAYER_STATUS_ERROR = 'INVALID_PLAYER_STATUS_ERROR',
	/**
	 * Se utiliza cuando el token de refresco de un usuario no es válido.
	 */
	INVALID_REFRESH_TOKEN_ERROR = 'INVALID_REFRESH_TOKEN_ERROR',
	/**
	 * Se utiliza cuando el icono de un usuario no cumple con las
	 * características requeridas por el sistema.
	 */
	INVALID_USER_ICON_ERROR = 'INVALID_USER_ICON_ERROR',
	/**
	 * Se utiliza cuando un ID de un usuario no cumple con las
	 * características requeridas por el sistema.
	 */
	INVALID_USER_ID_ERROR = 'INVALID_USER_ID_ERROR',
	/**
	 * Se utiliza cuando el estado de un usuario no se encuentra en
	 * el archivo de constantes.
	 */
	INVALID_USER_STATUS_ERROR = 'INVALID_USER_STATUS_ERROR',
	/**
	 * Se utiliza cuando se solicita el parámetro "isPublic" y no se envía.
	 */
	IS_PUBLIC_IS_REQUIRED_ERROR = 'IS_PUBLIC_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida el parámetro "isPublic" y no es un boolean.
	 */
	IS_PUBLIC_MUST_BE_A_BOOLEAN_ERROR = 'IS_PUBLIC_MUST_BE_A_BOOLEAN_ERROR',
	/**
	 * Se utiliza cuando una partida no puede ser iniciada.
	 */
	MATCH_CANNOT_BE_STARTED_ERROR = 'MATCH_CANNOT_BE_STARTED_ERROR',
	/**
	 * Se utiliza cuando un usuario intenta realizar una operación con tokens
	 * y no hay suficientes.
	 */
	NOT_ENOUGH_TOKENS_ERROR = 'NOT_ENOUGH_TOKENS_ERROR',
	/**
	 * Se utiliza cuando un usuario intenta iniciar un juego del cual no es el creador.
	 */
	ONLY_GAME_HOST_CAN_START_THE_MATCH_ERROR = 'ONLY_GAME_HOST_CAN_START_THE_MATCH_ERROR',
	/**
	 * Se utiliza cuando se solicita una contraseña y no se envía.
	 */
	PASSWORD_IS_REQUIRED_ERROR = 'PASSWORD_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida una contraseña y no es de tipo string.
	 */
	PASSWORD_MUST_BE_A_STRING_ERROR = 'PASSWORD_MUST_BE_A_STRING_ERROR',
	/**
	 * Se utiliza cuando se solicita un jugador que no existe.
	 */
	PLAYER_NOT_FOUND_ERROR = 'PLAYER_NOT_FOUND_ERROR',
	/**
	 * Se utiliza cuando se solicita un token de refresco y no se envía.
	 */
	REFRESH_TOKEN_IS_REQUIRED_ERROR = 'REFRESH_TOKEN_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida un token de refresco y no es de tipo string.
	 */
	REFRESH_TOKEN_MUST_BE_A_STRING_ERROR = 'REFRESH_TOKEN_MUST_BE_A_STRING_ERROR',
	/**
	 * Se utiliza cuando se solicita el parámetro "requiredPlayers" y no se envía.
	 */
	REQUIRED_PLAYERS_IS_REQUIRED_ERROR = 'REQUIRED_PLAYERS_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cando se valida el parámetro "requiredPlayers" y no es un número válido
	 */
	REQUIRED_PLAYERS_MUST_BE_A_INTEGER_ERROR = 'REQUIRED_PLAYERS_MUST_BE_A_INTEGER_ERROR',
	/**
	 * Se utiliza cuando se valida el parámetro "requiredPlayers" y no está
	 * en el rango definido por el sistema.
	 */
	REQUIRED_PLAYERS_MUST_BE_IN_RANGE_ERROR = 'REQUIRED_PLAYERS_MUST_BE_IN_RANGE_ERROR',
	/**
	 * Mensaje que indica que un request no tiene autorización.
	 */
	UNAUTHORIZED = 'UNAUTHORIZED',
	/**
	 * Se utiliza cuando se intenta crear un usuario que ya existe.
	 */
	USER_ALREADY_EXISTS_ERROR = 'USER_ALREADY_EXISTS_ERROR',
	/**
	 * Se utiliza para indicar que el icono de un usuario debe ser una cadena de texto.
	 */
	USER_ICON_MUST_BE_A_STRING = 'USER_ICON_MUST_BE_A_STRING',
	/**
	 * Se utiliza para indicar que el icono de un usuario es requerido.
	 */
	USER_ICON_IS_REQUIRED = 'USER_ICON_IS_REQUIRED',
	/**
	 * Se utiliza cuando se intenta cambiar el estado de un usuario a jugando,
	 * cuando ya está jugando.
	 */
	USER_IS_ALREADY_PLAYING_ERROR = 'USER_IS_ALREADY_PLAYING_ERROR',
	/**
	 * Se utiliza cuando un usuario intenta acceder a recursos de un
	 * juego en el cual no está jugando.
	 */
	USER_IS_NOT_PART_OF_A_GAME_ERROR = 'USER_IS_NOT_PART_OF_A_GAME_ERROR',
	/**
	 * Se utiliza cuando se solicita un usuario que no existe.
	 */
	USER_NOT_FOUND_ERROR = 'USER_NOT_FOUND_ERROR',
	/**
	 * Se utiliza cuando se solicita la actualización de un usuario,
	 * pero algo falla.
	 */
	USER_NOT_UPDATED_ERROR = 'USER_NOT_UPDATED_ERROR',
	/**
	 * Se utiliza cuando se solicita un nombre de usuario y no se envía.
	 */
	USERNAME_IS_REQUIRED_ERROR = 'USERNAME_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida un nombre de usuario y no es de tipo string.
	 */
	USERNAME_MUST_BE_A_STRING_ERROR = 'USERNAME_MUST_BE_A_STRING_ERROR',
}
