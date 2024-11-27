import {validerNote0A100, validerStringsRemplies} from "./fonctionnaliteUtilitaire.js";
import {addCritique, deleteCritiqueById} from "./httpCritiques.js";

/**
 * Ajoute une nouvelle critique à la liste.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 * @param {function} setListeCritiques - Fonction pour mettre à jour la liste des critiques.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 */
export async function ajouterNouvelleCritique(event, setListeCritiques, setMessageErreur, triggerCritiqueRefetch) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let nouvelleCritiqueInfo = obtenirNouvelleCritique(formData);

    if (!validerNouvelleCritique(formData, nouvelleCritiqueInfo, setMessageErreur)) {
        return;
    }
    
    try {
        let nouvelleCritique = await addCritique(nouvelleCritiqueInfo);
        setListeCritiques((anciennesCritiques) => [nouvelleCritique, ...anciennesCritiques]);
        triggerCritiqueRefetch();
        setMessageErreur("");
    }
    catch (e) {
        console.log(e);
    }
    event.target.reset();
}

/**
 * Valide une nouvelle critique.
 *
 * @param {FormData} formData - Les données du formulaire.
 * @param {object} nouvelleCritique - La nouvelle critique.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 * @returns {boolean} - True si la critique est valide, false sinon.
 */
function validerNouvelleCritique(formData, nouvelleCritique, setMessageErreur) {

    if (!validerStringsRemplies(formData.get("qualiteSonore"), formData.get("qualiteVisuelle"), formData.get("appreciation"))) {
        setMessageErreur("Tous les champs doivent être remplis");
        return false;
    }

    if (!validerNote0A100(nouvelleCritique.qualiteVisuelle, nouvelleCritique.qualiteSonore, nouvelleCritique.appreciation)) {
        setMessageErreur("Les notes doivent être entre 0 et 100");
        return false;
    }

    return true;
}

/**
 * Crée une nouvelle critique à partir des données d'un formulaire.
 *
 * @param {FormData} formData - Les données du formulaire de soumission de la critique.
 * @returns {Object} Un objet représentant la nouvelle critique.
 */
function obtenirNouvelleCritique(formData) {
    

    return {
        eidr: Number(formData.get("nomFilm")),
        date: new Intl.DateTimeFormat('en-CA').format(Date.now()),
        qualiteVisuelle: Number(formData.get("qualiteVisuelle")),
        qualiteSonore: Number(formData.get("qualiteSonore")),
        appreciation: Number(formData.get("appreciation"))
    }
}

/**
 * Retire une critique de la liste.
 *
 * @param {Event} event - L'événement de clic sur le bouton de suppression.
 * @param {number} id - L'identifiant de la critique à supprimer.
 * @param {function} setListeCritiques - Fonction pour mettre à jour la liste des critiques.
 * @param triggerCritiqueRefetch
 */
export async function retirerCritiqueParId(event, id, setListeCritiques, triggerCritiqueRefetch) {
    event.preventDefault();

    try {
        await deleteCritiqueById(id);
        setListeCritiques(ancienneListe => ancienneListe.filter(critique => critique.id !== id));
        triggerCritiqueRefetch();
    }
    catch (e) {
        console.log('La destruction de ' + id + ' n\'a pas fonctionné');
    }


}

export async function retirerCritiquesParEidr(event, eidr, setListeCritiques, triggerCritiqueRefetch) {
    event.preventDefault();

    try {
        await deleteCritiqueById(id);
        setListeCritiques(ancienneListe => ancienneListe.filter(critique => critique.eidr !== eidr));
        triggerCritiqueRefetch();
    }
    catch (e) {
        console.log("La destruction des critiques avec l'eidr " + id + " n'a pas fonctionné");
    }
}

/**
 * Obtient le nom du produit associé à un EIDR.
 *
 * @param {number} EIDR - L'identifiant unique du produit.
 * @param {array} listeProduits - La liste de tous les produits.
 * @returns {string} - Le nom du produit, ou "Produit inconnu" si le produit n'est pas trouvé.
 */
export function obtenirNomProduitPourCritique(eidr, listeProduits) {
    const produit = listeProduits.find(produit => produit.eidr === eidr);
    return produit ? produit.nom : "Produit inconnu";
}
