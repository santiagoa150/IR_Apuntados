import {UserType} from '../user.type.ts';

/**
 * Definición de los datos
 */
export type GetMeResponse = {
    success: boolean,
    user: UserType;
}