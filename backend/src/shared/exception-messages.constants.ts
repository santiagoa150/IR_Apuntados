/**
 * @enum {string} Los mensajes de error de la aplicación.
 * @readonly
 */
export enum ExceptionMessagesConstants {
	/**
	 * Se utiliza cuando las credenciales de inicio de sesión de un usuario no
	 * son válidas.
	 */
	INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
	/**
	 * Se utiliza cuando la contraseña de un usuario no cumple con
	 * las características requeridas por el sistema.
	 */
	INVALID_PASSWORD_ERROR = 'INVALID_PASSWORD_ERROR',
	/**
	 * Se utiliza cuando el token de refresco de un usuario no es válido.
	 */
	INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
	/**
	 * Se utiliza cuando se quiere expresar un error del servidor que
	 * no debe ser comunicado al usuario final.
	 */
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
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
	 * Se utiliza cuando se solicita un usuario que no existe.
	 */
	USER_NOT_FOUND_ERROR = 'USER_NOT_FOUND_ERROR',
}
