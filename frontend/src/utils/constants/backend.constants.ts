/**
 * Constantes que define las urls para acceder a los recursos del
 * backend.
 * @enum {string}
 * @readonly
 */
export enum BackendConstants {
    /**
     * Ruta para crear un juego en la aplicación.
     */
    CREATE_GAME_URL = '/api/game',
    /**
     * Ruta para acceder a los diseños de cartas disponibles.
     */
    GET_ACTIVE_CARD_DESIGNS_URL = '/api/card-design/active',
    /**
     * Ruta para acceder al diseño de carta actual del usuario.
     */
    GET_CURRENT_CARD_DESIGN_URL = '/api/card-design/current',
    /**
     * Ruta para acceder al usuario que ejecuta la aplicación.
     */
    GET_ME_URL = '/api/user/me',
    /**
     * Ruta para acceder a los juegos públicos.
     */
    GET_PUBLIC_GAMES_URL = '/api/game/public',
    /**
     * Ruta para ingresar a un juego.
     */
    JOIN_GAME_URL = '/api/game/join',
    /**
     * Ruta para acceder al login de la aplicación.
     */
    LOGIN_URL = '/api/session/login',
    /**
     * Ruta para acceder al registro de la aplicación.
     */
    REGISTER_URL = '/api/user',
    /**
     * Ruta para acceder al servicio que refresca el token del usuario.
     */
    REFRESH_ACCESS_TOKEN_URL = '/api/session/refresh-token',
    /**
     * Ruta para acceder al servicio que actualiza el diseño de
     * carta de un usuario.
     */
    UPDATE_USER_CARD_DESIGN_URL = '/api/user/card-design',
    /**
     * Ruta para acceder al servicio que actualiza el icono del usuario.
     */
    UPDATE_USER_ICON_URL = '/api/user/icon',
    /**
     * Ruta para acceder al servicio que permite obtener el juego actual de un usuario.
     */
    GET_CURRENT_GAME_URL = '/api/game/current',
    /**
     * Ruta para acceder al servicio que permite obtener el jugador actual de un usuario.
     */
    GET_CURRENT_PLAYER_URL = '/api/player/current',
    /**
     * Ruta para acceder al servicio que permite iniciar una partida.
     */
    START_MATCH_URL = '/api/match',
    /**
     * Ruta para acceder al servicio que permite pasar una partida.
     */
    PASS_SHIFT_URL = '/api/player/pass-shift',
    /**
     * Ruta para acceder al servicio que permite jalar una carta desde el mazo.
     */
    PULL_FROM_CARD_DECK_URL = '/api/player/pull-from-card-deck',
    /**
     * Ruta para acceder al servicio que permite jalar una carta desde las cartas desechadas.
     */
    PULL_FROM_DISCARDED_CARDS = '/api/player/pull-from-discarded-cards',
    /**
     * Ruta para acceder al servicio que permite a un jugador ganar.
     */
    WIN_MATCH = '/api/player/win-match',
}

/**
 * Definición de la configuración para cada servicio del backend
 * @const {Record<BackendConstants, BackendConfigType>}
 */
export const BackendConfigConstants: Record<BackendConstants, BackendConfigType> = {
    [BackendConstants.CREATE_GAME_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_CURRENT_PLAYER_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_ACTIVE_CARD_DESIGNS_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_CURRENT_CARD_DESIGN_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_ME_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_PUBLIC_GAMES_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.JOIN_GAME_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.LOGIN_URL]: {
        requireAccessToken: false,
        retryRequest: false,
    },
    [BackendConstants.REGISTER_URL]: {
        requireAccessToken: false,
        retryRequest: false,
    },
    [BackendConstants.REFRESH_ACCESS_TOKEN_URL]: {
        requireAccessToken: false,
        retryRequest: false,
    },
    [BackendConstants.UPDATE_USER_CARD_DESIGN_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.UPDATE_USER_ICON_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.GET_CURRENT_GAME_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.START_MATCH_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.PASS_SHIFT_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.PULL_FROM_CARD_DECK_URL]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.PULL_FROM_DISCARDED_CARDS]: {
        requireAccessToken: true,
        retryRequest: true,
    },
    [BackendConstants.WIN_MATCH]: {
        requireAccessToken: true,
        retryRequest: true,
    }
};

/**
 * Definición de la configuración que debe tener cada servicio del backend.
 */
export type BackendConfigType = {
    requireAccessToken: boolean;
    retryRequest: boolean;
}