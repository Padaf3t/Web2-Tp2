/**
 * Récupère de manière asynchrone toutes les critiques disponibles depuis l'API backend.
 *
 * @returns {Promise<Array>} Une promesse qui résout en un tableau de critiques.
 * @throws {Error} Si une erreur se produit lors de la récupération des critiques.
 */
export async function fetchAvailableCritiquesAsync() {
    const response = await fetch('http://localhost:8080/critiques');
    if (!response.ok) {
        throw new Error('Échec du chargement des critiques');
    }
    const resData = await response.json();
    return resData;
}

/**
 * Ajoute une nouvelle critique à l'API backend.
 *
 * @param {Object} critique L'objet critique à ajouter.
 * @returns {Promise<Object>} Une promesse qui résout en la critique ajoutée.
 * @throws {Error} Si une erreur se produit lors de l'ajout de la critique.
 */
export async function addCritique(critique) {
    const response = await fetch('http://localhost:8080/critique/post',
        {
            method: 'POST',
            body: JSON.stringify(critique),
            headers:
                {
                    'Content-Type': 'application/json'
                }
        }
    );

    if (!response.ok) {
        const raison = await response.json();
        throw new Error('La critique n\'a pas pu être créée '+ raison.message);
    }
    const resData = await response.json();
    return resData;
}

/**
 * Supprime une critique de l'API backend en utilisant son ID.
 *
 * @param {number} id L'ID de la critique à supprimer.
 * @throws {Error} Si une erreur se produit lors de la suppression de la critique.
 */
export async function deleteCritiqueById(id) {
    const response = await fetch('http://localhost:8080/critique/deletebyid/' + id,
        {
            method: 'DELETE',
            headers: {}
        }
    )
    if (!response.ok) {
        throw new Error('la destruction a échouée');
    }
}

/**
 * Supprime des critiques de l'API backend en utilisant leur EIDR.
 *
 * @param {number} eidr L'EIDR des critiques à supprimer.
 * @throws {Error} Si une erreur se produit lors de la suppression des critiques.
 */
export async function deleteCritiqueByEidr(eidr) {
    const response = await fetch('http://localhost:8080/critique/deletebyeidr/' + eidr,
        {
            method: 'DELETE',
            headers: {}
        }
    )
    if (!response.ok) {
        throw new Error('la destruction a échouée');
    }
}