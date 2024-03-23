import {createTheme, Theme} from '@mui/material';

/**
 * Constante que define el color principal de la aplicación.
 * @const {string}
 */
const PRIMARY_COLOR: string = '#13CE66';
/**
 * Constante que define el color secundario de la aplicación.
 * @const {string}
 */
const SECONDARY_COLOR: string = '#EBEBEB';
/**
 * Constante que define el color terciario de la aplicación.
 * @const {string}
 */
const TERTIARY_COLOR: string = '#000000';

/**
 * Constante que define la fuente de la aplicación.
 * @const {string}
 */
const FONT_FAMILY: string = '"Agbalumo", system-ui';

/**
 * Constante que define el tema de la aplicación.
 * @const {AppTheme}
 */
export const AppTheme: Theme = createTheme({
    typography: {
        fontFamily: FONT_FAMILY,
    },
    palette: {
        primary: {main: PRIMARY_COLOR},
        secondary: {main: SECONDARY_COLOR},
        background: {default: SECONDARY_COLOR},
        text: {
            primary: TERTIARY_COLOR,
        }
    }
});