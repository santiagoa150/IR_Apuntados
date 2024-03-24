/**
 * constantes que definen los errores de validación de datos del sistema.
 * @enum
 * @readonly
 */
export enum ValidationErrorsConstants {
    /**
     * Error que indica que un valor debe tener más de 8 carácteres.
     */
    LENGTH_OVER_6_ERROR = 'El valor debe tener 6 carácteres o más.',
    /**
     * Error que indica que la contraseña y su confirmación son
     * diferentes.
     */
    PASSWORD_CONFIRMATION_DIFFERENT_ERROR = 'Las contraseñas son diferentes.',
    /**
     * Error que indica que una contraseña no cumple las características del sistema.
     */
    PASSWORD_STRUCTURE_ERROR = 'La contraseña debe tener mínimo, 1 mayúscula, 1 minúscula, ' +
        '1 número, 1 carácter especial y 8 carácteres o más.',
    /**
     * Error que indica que un valor es requerido.
     */
    REQUIRED_ERROR = 'El valor es requerido.',
}