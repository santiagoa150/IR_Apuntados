/**
 * @enum {string} Los mensajes de error de la aplicación.
 * @readonly
 */
export enum ExceptionMessagesConstants {
	/**
	 * Se utiliza cuando se solicita el parámetro "cardDesignId" y no se envía.
	 */
	CARD_DESIGN_ID_IS_REQUIRED_ERROR = 'CARD_DESIGN_ID_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando el ID de un diseño de carta y no es
	 * de tipo string.
	 */
	CARD_DESIGN_ID_MUST_BE_STRING_ERROR = 'CARD_DESIGN_ID_MUST_BE_STRING_ERROR',
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
	 * Se utiliza cuando un ID de diseño de carta no cumple con las características
	 * requeridas por el sistema.
	 */
	INVALID_CARD_DESIGN_ID_ERROR = 'INVALID_CARD_DESIGN_ID_ERROR',
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
	 * Se utiliza cuando el estado de un juego no se encuentra en
	 * el archivo de constantes.
	 */
	INVALID_GAME_STATUS_ERROR = 'INVALID_GAME_STATUS_ERROR',
	/**
	 * Se utiliza cuando la contraseña de un usuario no cumple con
	 * las características requeridas por el sistema.
	 */
	INVALID_PASSWORD_ERROR = 'INVALID_PASSWORD_ERROR',
	/**
	 * Se utiliza cuando el token de refresco de un usuario no es válido.
	 */
	INVALID_REFRESH_TOKEN_ERROR = 'INVALID_REFRESH_TOKEN_ERROR',
	/**
	 * Se utiliza cuando se quiere expresar un error del servidor que
	 * no debe ser comunicado al usuario final.
	 */
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
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
	 * Se utiliza cuando se solicita una contraseña y no se envía.
	 */
	PASSWORD_IS_REQUIRED_ERROR = 'PASSWORD_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida una contraseña y no es de tipo string.
	 */
	PASSWORD_MUST_BE_STRING_ERROR = 'PASSWORD_MUST_BE_STRING_ERROR',
	/**
	 * Se utiliza cuando se solicita un token de refresco y no se envía.
	 */
	REFRESH_TOKEN_IS_REQUIRED_ERROR = 'REFRESH_TOKEN_IS_REQUIRED_ERROR',
	/**
	 * Se utiliza cuando se valida un token de refresco y no es de tipo string.
	 */
	REFRESH_TOKEN_MUST_BE_STRING_ERROR = 'REFRESH_TOKEN_MUST_BE_STRING_ERROR',
	/**
	 * Se utiliza cuando se intenta crear un usuario que ya existe.
	 */
	USER_ALREADY_EXISTS_ERROR = 'USER_ALREADY_EXISTS_ERROR',
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
	USERNAME_MUST_BE_STRING_ERROR = 'USERNAME_MUST_BE_STRING_ERROR',

}
