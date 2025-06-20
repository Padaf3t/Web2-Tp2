/**
 * Valide si tous les éléments d'une liste sont des notes comprises entre 0 et 100.
 *
 * @param {...number} listeItems - Une liste de notes à valider.
 * @returns {boolean} - True si toutes les notes sont comprises entre 0 et 100, false sinon.
 */
export function validerNote0A100(...listeItems) {
    for (let item in listeItems) {
        if (listeItems[item] < 0 || listeItems[item] > 100) {
            return false
        }
    }
    return true;
}

/**
 * Valide si tous les éléments d'une liste sont des nombres positifs.
 *
 * @param {...number} listeItems - Une liste de nombres à valider.
 * @returns {boolean} - True si tous les nombres sont positifs, false sinon.
 */
export function validerNombrePositif(...listeItems){
    for (let item in listeItems) {
        if (listeItems[item] < 0){
            return false
        }
    }
    return true;
}

/**
 * Valide si tous les éléments d'une liste sont des chaînes de caractères non vides.
 *
 * @param {...string} listeItems - Une liste de chaînes à valider.
 * @returns {boolean} - True si toutes les chaînes sont non vides, false sinon.
 */
export function validerStringsRemplies(...listeItems) {
    for (let item in listeItems) {
        if (listeItems[item].trim() === "") {
            return false
        }
    }
    return true;
}

/**
 * Valide si tous les éléments d'une liste de chaînes de caractères ont une longueur inférieure ou égale à une longueur maximale spécifiée.
 *
 * @param {number} longueurMax - La longueur maximale autorisée.
 * @param {...string} listeItems - Une liste de chaînes à valider.
 * @returns {boolean} - True si toutes les chaînes ont une longueur inférieure ou égale à longueurMax, false sinon.
 */
export function validerLongueurMaxString(longueurMax,...listeItems) {
    for (let item in listeItems) {
        if (listeItems[item].length > longueurMax) {
            return false
        }
    }
    return true;
}

/**
 * Valide si la date est aujourd'hui ou dans le passé
 * @param date la date à valider
 * @returns {boolean} si la date est valide
 */
export function validerDateAnterieur(date) {
    // Create a new Date object for today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set the time to 00:00:00 to ignore the time part during comparison

    // Check if the provided date is before or equal to today
    return new Date(date) <= today;
}