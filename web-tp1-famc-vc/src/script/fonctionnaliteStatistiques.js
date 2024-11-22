/**
 * Calcule la moyenne des moyennes de critiques pour un produit donné.
 *
 * @param {number} EIDR - L'identifiant unique du produit.
 * @param {Critique[]} listeCritiques - La liste de toutes les critiques.
 * @returns {string} La moyenne des moyennes de critiques arrondie à deux décimales, ou 0 si aucune critique n'est trouvée.
 */
export function calculerMoyenneDesMoyennes(EIDR, listeCritiques) {

    const listeCritiquesfiltree = listeCritiques.filter(critique => critique.EIDR === EIDR);
    if (listeCritiquesfiltree.length === 0) {
        return 0;
    }

    let totalMoyenne = 0;
    for (let i = 0; i < listeCritiquesfiltree.length; i++) {
        totalMoyenne += Number(listeCritiquesfiltree[i].moyenne);
    }

    return (totalMoyenne / listeCritiquesfiltree.length).toFixed(2);
}

/**
 * Calcule la moyenne des critiques pour chaque produit et crée une nouvelle liste de produits avec la moyenne ajoutée.
 *
 * @param {Produit[]} listeProduits - La liste de tous les produits.
 * @param {Critique[]} listeCritiques - La liste de toutes les critiques.
 * @returns {Produit[]} Une nouvelle liste de produits avec la propriété "moyenne" ajoutée, contenant la moyenne des critiques pour chaque produit.
 */
function obtenirListeProduitsAvecMoyenne(listeProduits, listeCritiques){
    return listeProduits.map(produit => ({
        ...produit,
        moyenne: calculerMoyenneDesMoyennes(produit.EIDR, listeCritiques)
    }));
}

/**
 * Obtient une liste de produits avec leur moyenne de critique, triée par ordre décroissant de la moyenne.
 *
 * @param {Produit[]} listeProduits - La liste de tous les produits.
 * @param {Critique[]} listeCritique - La liste de toutes les critiques (singulier "Critique" semble incorrect).
 * @returns {Produit[]} Une nouvelle liste de produits triée par ordre décroissant de la moyenne des critiques.
 */
export function obtenirListeProduitsMoyenneOrdonne(listeProduits, listeCritique){
    return ordonnerListeParMoyenne(obtenirListeProduitsAvecMoyenne(listeProduits, listeCritique));
}

/**
 * Trie une liste de produits avec leur moyenne de critique par ordre décroissant de la moyenne.
 *
 * @param {Produit[]} listeProduitsAvecMoyenne - Une liste de produits contenant une propriété "moyenne".
 * @returns {Produit[]} La même liste triée par ordre décroissant de la moyenne des critiques.
 */
function ordonnerListeParMoyenne(listeProduitsAvecMoyenne){
    return listeProduitsAvecMoyenne.sort((a, b) => b.moyenne - a.moyenne);
}

/**
 * Calcule la moyenne globale des critiques pour une liste de produits.
 *
 * @param {Produit[]} listeProduits - La liste de tous les produits.
 * @param {Critique[]} listeCritiques - La liste de toutes les critiques.
 * @returns {string} La moyenne globale des critiques arrondie à deux décimales.
 */
export function combinerTotalMoyenneProduit(listeProduits, listeCritiques){
    let listeProduit = obtenirListeProduitsAvecMoyenne(listeProduits, listeCritiques);
    let totalMoyenne = 0;

    for (let i = 0; i < listeProduit.length; i++) {
        totalMoyenne += Number(listeProduit[i].moyenne);
    }
    let moyenne = 0;
    if(listeProduit.length >0){
        moyenne = totalMoyenne/listeProduit.length;
    }
    return moyenne.toFixed(2);
}

/**
 * Crée une map qui associe chaque catégorie de produit à une liste de produits.
 *
 * @param {Produit[]} listeProduit - La liste de tous les produits.
 * @returns {Produit[]} Une liste de produits regroupés par catégorie.
 */
export function obtenirMapCategorieProduit(listeProduit){
    const produitCollection = listeProduit.reduce((collection, film) => {
        if (!collection[film.genre]) {
            collection[film.genre] = {
                genre: film.genre,
                films: []
            };
        }
        collection[film.genre].films.push(film);
        return collection;
    }, []);

    return Object.values(produitCollection);
}