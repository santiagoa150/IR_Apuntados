import {BackendConfigConstants, BackendConfigType, BackendConstants} from './constants/backend.constants.ts';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {SessionStorageUtils} from '../store/session-storage.utils.ts';
import {SessionStorageConstants} from '../store/session-storage.constants.ts';
import {ErrorResponseType} from '../types/error.response.type.ts';
import {RefreshTokenRequest, RefreshTokenResponse} from '../types/services/refresh-token.ts';
import {RoutesConstants} from '../config/app.router.tsx';

/**
 * Clase con un conjunto de operaciones que permiten utilizar
 * axios para acceder a los recursos de la aplicación.
 * @class
 */
export class BackendUtils {

    /**
     * @param {(message: string) => (void)} callBackErrors Callback para mapear los
     * errores de los servicios.
     * @constructor
     */
    constructor(
        private readonly callBackErrors?: (message: string) => (void),
    ) {
    }

    /**
     * Método patch que permite acceder al backend.
     * @template Res El tipo de la respuesta del servicio.
     * @template Req El tipo del request del servicio.
     * @param {BackendConfigConstants} url
     * @param {Req} body Los parámetros que requiere el servicio.
     * @param {number} [attempts=0] Define la cantidad de intentos del servicio.
     * @returns {Promise<Res | undefined>} La respuesta del servicio.
     */
    public async patch<Res, Req>(
        url: BackendConstants,
        body: Req,
        attempts: number = 0
    ): Promise<Res | undefined> {
        const serviceConfig: BackendConfigType = BackendConfigConstants[url];
        return axios.patch<Res>(url, body, BackendUtils.buildRequestConfig(serviceConfig))
            .then((data: AxiosResponse): Res => data.data)
            .catch(async (e: ErrorResponseType) => {
                if (BackendUtils.resolveIfRetry(serviceConfig, e, attempts)) {
                    return this.refreshAccessToken().then(() => {
                        attempts += 1;
                        return this.patch<Res, Req>(url, body, attempts++);
                    });
                }
                this.processError(serviceConfig, e);
                return undefined;
            });
    }

    /**
     * Método post que permite acceder al backend.
     * @template Res El tipo de la respuesta del servicio.
     * @template Req El tipo del request del servicio.
     * @param {BackendConfigConstants} url
     * @param {Req} body Los parámetros que requiere el servicio.
     * @param {number} [attempts=0] Define la cantidad de intentos del servicio.
     * @returns {Promise<Res | undefined>} La respuesta del servicio.
     */
    public async post<Res, Req>(
        url: BackendConstants,
        body: Req,
        attempts: number = 0
    ): Promise<Res | undefined> {
        const serviceConfig: BackendConfigType = BackendConfigConstants[url];
        return axios.post<Res>(url, body, BackendUtils.buildRequestConfig(serviceConfig))
            .then((data: AxiosResponse): Res => data.data)
            .catch(async (e: ErrorResponseType) => {
                if (BackendUtils.resolveIfRetry(serviceConfig, e, attempts)) {
                    return this.refreshAccessToken().then(() => {
                        attempts += 1;
                        return this.post<Res, Req>(url, body, attempts++);
                    });
                }
                this.processError(serviceConfig, e);
                return undefined;
            });
    }

    /**
     * Método get que permite acceder al backend.
     * @template Res El tipo de la respuesta del servicio.
     * @template Req El tipo del request del servicio.
     * @param {BackendConfigConstants} url
     * @param {Req} query Los parámetros que requiere el servicio.
     * @param {number} [attempts=0] Define la cantidad de intentos del servicio.
     * @returns {Promise<Res | undefined>} La respuesta del servicio.
     */
    public async get<Res, Req>(
        url: BackendConstants,
        query?: Req,
        attempts: number = 0
    ): Promise<Res | undefined> {
        const serviceConfig: BackendConfigType = BackendConfigConstants[url];
        const backendConfig: AxiosRequestConfig = BackendUtils.buildRequestConfig(serviceConfig);
        if (query) backendConfig.params = query;
        return axios.get<Res>(url, backendConfig)
            .then((data: AxiosResponse): Res => data.data)
            .catch(async (e: ErrorResponseType) => {
                if (BackendUtils.resolveIfRetry(serviceConfig, e, attempts)) {
                    return this.refreshAccessToken().then(() => {
                        attempts += 1;
                        return this.get<Res, Req>(url, query, attempts++);
                    });
                }
                this.processError(serviceConfig, e);
                return undefined;
            });
    }

    /**
     * Método que permite mapear procesar los errores de los servicios.
     * @param {BackendConfigType} serviceConfig La configuración del servicio.
     * @param {ErrorResponseType} e El error del servicio.
     * @private
     */
    private processError(serviceConfig: BackendConfigType, e: ErrorResponseType): void {
        if (serviceConfig.requireAccessToken && BackendUtils.extractCode(e) === 401) {
            SessionStorageUtils.del(SessionStorageConstants.KEY_ACCESS_TOKEN);
            SessionStorageUtils.del(SessionStorageConstants.KEY_REFRESH_TOKEN);
            window.location.href = RoutesConstants.DEFAULT_ROUTE;
        } else {
            const message: string = BackendUtils.extractMessage(e);
            console.log(message);
            if (this.callBackErrors) this.callBackErrors(message);
        }

    }

    /**
     * Método que permite refrescar el token de acceso del usuario.
     * @private
     * @async
     */
    private async refreshAccessToken(): Promise<void> {
        const refreshToken = SessionStorageUtils.get<SessionStorageConstants.KEY_REFRESH_TOKEN>(SessionStorageConstants.KEY_REFRESH_TOKEN);
        if (refreshToken) {
            const body: RefreshTokenRequest = {refreshToken};
            return this.post<RefreshTokenResponse, RefreshTokenRequest>(BackendConstants.REFRESH_ACCESS_TOKEN_URL, body)
                .then((res) => {
                    if (res) {
                        SessionStorageUtils.set<SessionStorageConstants.KEY_ACCESS_TOKEN>(
                            SessionStorageConstants.KEY_ACCESS_TOKEN, res.accessToken
                        );
                    }
                })
                .catch();
        }
    }

    /**
     * Método que determina si un servicio debe reintentar el consumo.
     * @param {BackendConfigType} c La configuración del servicio.
     * @param {ErrorResponseType} e El error del servicio.
     * @param {number} attempts Los reintentos totales.
     * @returns {boolean} "true" si se debe reintentar, "false" si no.
     * @static
     * @private
     */
    private static resolveIfRetry(c: BackendConfigType, e: ErrorResponseType, attempts: number): boolean {
        return c.retryRequest && BackendUtils.extractCode(e) == 401 && attempts == 0;
    }

    /**
     * Método que permite extraer el código de error de un servicio.
     * @param {ErrorResponseType} e El error del servicio.
     * @return {number} El código de error extraído.
     * @private
     */
    private static extractCode(e: ErrorResponseType): number {
        return e?.response?.data?.code || 500;
    }

    /**
     * Método que permite extraer el código de error de un servicio.
     * @param {ErrorResponseType} e El error del servicio.
     * @returns {string} El mensaje de error extraído.
     * @private
     */
    private static extractMessage(e: ErrorResponseType): string {
        return e?.response?.data?.message || 'UNKNOWN_ERROR';
    }

    /**
     * Método que permite mapea la configuración de los servicios del backend
     * al formato de Axios.
     * @param {BackendConfigType} backendConfig La configuración que requerida por el servicio.
     * @returns {AxiosRequestConfig} La configuración de axios.
     * @private
     * @static
     */
    private static buildRequestConfig(backendConfig: BackendConfigType): AxiosRequestConfig {
        const response: AxiosRequestConfig = {
            baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
        };
        if (backendConfig.requireAccessToken) {
            const key: SessionStorageConstants = SessionStorageConstants.KEY_ACCESS_TOKEN;
            const accessToken = SessionStorageUtils.get<typeof key>(key);
            response.headers = {authorization: `Bearer ${accessToken}`};
        }
        return response;
    }
}