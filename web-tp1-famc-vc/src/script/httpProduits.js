export async function fetchAvailableProduitsAsync() {
    const response = await fetch('http://localhost:8888/produits');
    if (!response.ok) {
        throw new Error('Échec du chargement des produits');
    }
    const resData = await response.json();
    return resData;
}

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
        throw new Error('La location n\'a pas pu être créée ou modifiée' + raison.message);
    }
    const resData = await response.json();
    return resData;
}

