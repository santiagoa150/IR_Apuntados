import {Dispatch, SetStateAction} from 'react';
import {ValidationErrorsConstants} from './constants/validation-errors.constants.ts';

/**
 * Clase que contiene una serie de estructuras para válidar los datos de dominio
 * del sistema.
 * @class
 * @abstract
 */
export abstract class ValidationUtils {

    /**
     * Permite validar la contraseña del usuario y mostrar los mensajes de error
     * en caso de que sean necesarios.
     * @param {string} value La contraseña que se valida.
     * @param {Dispatch<SetStateAction<string>>} setError Hook que permite actualizar el error
     * de la contraseña en caso de que haya algo inválido.
     * @returns {boolean} Bandera que determina si es válido.
     */
    static validatePassword(value: string, setError: Dispatch<SetStateAction<string>>): boolean {
        let response: boolean = false;
        if (!value) setError(ValidationErrorsConstants.REQUIRED_ERROR);
        else if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&()*,\-.:;<>?^_{|}~¡¿])\S{8,}$/)) {
            setError(ValidationErrorsConstants.PASSWORD_STRUCTURE_ERROR);
        } else {
            setError('');
            response = true;
        }
        return response;
    }

    /**
     * Permite validar el nombre de usuario y mostrar los mensajes de error
     * en caso de que sean necesarios.
     * @param {string} value El nombre de usuario que se valida.
     * @param {Dispatch<SetStateAction<string>>} setError Hook que permite actualizar el error
     * del nombre de usuario en caso de que haya algo inválido.
     * @returns {boolean} Determina si el nombre de usuario es válido.
     */
    static validateUsername(value: string, setError: Dispatch<SetStateAction<string>>): boolean {
        let response: boolean = false;
        if (!value) setError(ValidationErrorsConstants.REQUIRED_ERROR);
        else if (value.length < 8) setError(ValidationErrorsConstants.LENGTH_OVER_6_ERROR);
        else {
            setError('');
            response = true;
        }
        return response;
    }
}