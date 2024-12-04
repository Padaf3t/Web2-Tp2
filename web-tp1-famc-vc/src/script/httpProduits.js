/**
 * Appel la BD de produits afin d'obtenir tous les produits présent
 * @returns {Promise<any>} la liste de produits ou une erreur si non trouvé
 */
export async function fetchAvailableProduitsAsync() {
    const response = await fetch('http://localhost:8888/produits');
    if (!response.ok) {
        throw new Error('Échec du chargement des produits');
    }
    const resData = await response.json();
    return resData;
}

/**
 * Appel à ajouter un produit dans la BD de produit
 * @param produit Le produit à ajouter
 * @returns {Promise<any>} l'EIDR du produit ajouter ou une erreur si n'a pu être ajouté'
 */
export async function ajouteProduits(produit) {
    const response = await fetch('http://localhost:8888/produits/post',
        {
            method: 'POST',
            body: JSON.stringify(produit),
            headers:
                {
                    'Content-Type': 'application/json'
                }
        }
    );
    if (!response.ok) {
        const raison = await response.json();
        throw new Error('Le produit n\'a pas pu être créé' + raison.message);
    }
    const resData = await response.json();
    return resData;
}

/**
 * Appel à modifier un produit en BD
 * @param produit le produit à modifier
 * @returns {Promise<any>} le produit modifier en BD ou une erreur si n'a pu être modifié
 */
export async function modifierProduitBackend(produit) {
    const response = await fetch('http://localhost:8888/produits/put',
        {
            method: 'PUT',
            body: JSON.stringify(produit),
            headers:
                {
                    'Content-Type': 'application/json'
                }
        }
    );
    if (!response.ok) {
        const raison = await response.json();
        throw new Error('Le produit n\'a pas pu être créée ou modifiée' + raison.message);
    }
    const resData = await response.json();
    return resData;
}

/**
 * Appel à supprimer un produit en BD selon son EIDR
 * @param eidr l'identifiant EIDR du produit
 * @returns {Promise<boolean>} si la procédure à fonctionné
 */
export async function deleteProduit(eidr) {
    let path = "http://localhost:8888/produits/delete/" + eidr;
    const response = await fetch(path,
        {
            method: 'DELETE',
            headers: {}
        }
    );
    if (!response.ok) {
        const raison = await response.json();
        throw new Error('La location n\'a pas pu être supprimé' + raison.message);
    }

    return response.ok;
}

