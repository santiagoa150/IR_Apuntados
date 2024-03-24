/**
 * Definición de la respuesta con errores en los servicios.
 */
export type ErrorResponseType = {
    response?: {
        data?: {
            code?: number;
            message?: string;
            success?: boolean;
        }
    };
}