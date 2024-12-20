/**
 * Normaliza una cadena de texto eliminando diacríticos y convirtiéndola a minúsculas
 * @param {string} str - Cadena a normalizar
 * @returns {string} Cadena normalizada
 */
export const normalizeString = (str) => {
    if (!str) return '';
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};
