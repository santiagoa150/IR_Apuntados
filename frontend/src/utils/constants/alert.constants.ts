/**
 * Constantes que define los tipos de alertas que maneja la aplicación.
 * @enum
 * @readonly
 */
export enum AlertTypeConstants {
    /**
     * Alerta que es un mensaje de error.
     */
    ERROR_ALERT = 'error',
    /**
     * Alerta que es un mensaje satisfactorio.
     */
    SUCCESS_ALERT = 'success',
    /**
     * Alerta que es una advertencia.
     */
    WARNING_ALERT = 'warning',
}

/**
 * Constantes que definen lo mensajes de las alertas de la aplicación.
 * @const {Record<string, string>}
 */
export const AlertMessagesConstants: Record<string, string> = {
    INVALID_CREDENTIALS_ERROR: 'Credenciales inválidas',
    UNKNOWN_ERROR: 'Intente más tarde.',
    USER_ALREADY_EXISTS_ERROR: 'El usuario ya existe.',
    USER_NOT_FOUND_ERROR: 'El usuario no existe.',
    CARD_DESIGN_ID_IS_REQUIRED_ERROR: 'Diseño de carta requerido.'
};