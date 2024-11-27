export async function fetchAvailableCritiquesAsync() {
    const response = await fetch('http://localhost:8080/critiques');
    if (!response.ok) {
        throw new Error('Échec du chargement des critiques');
    }
    const resData = await response.json();
    return resData;
}

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