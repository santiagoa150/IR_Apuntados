/**
 * constantes que definen los errores de validación de datos del sistema.
 * @enum
 * @readonly
 */
export enum ValidationErrorsConstants {
    /**
     * Error que indica que un valor debe tener menos de 50 carácteres.
     */
    LENGTH_LOWER_50_ERROR = 'El valor debe tener menos de 50 carácteres.',
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
    /**
     * Error que indica que el valor debe ser mayor a 0.
     */
    VALUE_OVER_0_ERROR = 'El valor debe ser mayor a 0.'
}