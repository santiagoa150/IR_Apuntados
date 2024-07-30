/**
 * Permite construir la ruta en dónde se encuentran los iconos de la app.
 * @param {string} icon El icono que se busca.
 * @return {string} La url construida.
 */
export const buildProfileImageRoute = (icon: string): string => {
    return `${import.meta.env.VITE_PROFILE_IMAGES_URL}${icon}.png`;
};