export async function fetchAvailableCritiquesAsync() {
    const response = await fetch('http://localhost:8080/critiques');
    if (!response.ok) {
        throw new Error('Échec du chargement des critiques');
    }
    const resData = await response.json();
    return resData;
}