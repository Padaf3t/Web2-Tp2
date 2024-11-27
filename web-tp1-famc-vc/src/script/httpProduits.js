export async function fetchAvailableProduitsAsync() {
    const response = await fetch('http://localhost:8888/produits');
    if (!response.ok) {
        throw new Error('Échec du chargement des produits');
    }
    const resData = await response.json();
    return resData;
}

