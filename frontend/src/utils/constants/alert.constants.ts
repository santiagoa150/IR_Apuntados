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
    CARD_DESIGN_ID_IS_REQUIRED_ERROR: '¡Diseño de carta requerido!',
    INVALID_CREDENTIALS_ERROR: '¡Credenciales inválidas!',
    NOT_ENOUGH_TOKENS_ERROR: '¡No tienes tokens suficientes!',
    UNKNOWN_ERROR: 'Intente más tarde',
    USER_ALREADY_EXISTS_ERROR: '¡El usuario ya existe!',
    USER_IS_ALREADY_PLAYING_ERROR: '¡No puedes crear un juego si ya estás jugando!',
    USER_IS_ALREADY_PLAYING_ERROR_JOINING: '¡No puedes ingresar a un juego si ya estás jugando!',
    USER_NOT_FOUND_ERROR: '¡El usuario no existe!',
    GAME_EXCEEDS_ITS_PLAYER_COUNT_ERROR: '¡El juego ya está lleno!',
    SOMETHING_WENT_WRONG_ERROR: '¡Algo salió mal!',
    COPY_ON_CLIP_BOARD_MESSAGE: '¡Copiado en el portapapeles!',
    PLAYER_CANT_WIN_MESSAGE: '¡Aún no puedes ganar!'
};