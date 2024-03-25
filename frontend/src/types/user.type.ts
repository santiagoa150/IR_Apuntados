/**
 * Definición de los usuarios del sistema.
 */
export type UserType = {
    userId: string;
    status: string;
    username: string;
    icon: string;
    currentDesignId: string;
    tokens: number;
}