import {validerNote0A100, validerStringsRemplies} from "./fonctionnaliteUtilitaire.js";
import {addCritique, deleteCritiqueByEidr, deleteCritiqueById} from "./httpCritiques.js";
import {useState} from "react";

/**
 * Ajoute une nouvelle critique à la liste.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 * @param {function} setListeCritiques - Fonction pour mettre à jour la liste des critiques.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 * @param {function} setErreurPresente - Fonction pour signaler s'il y a des erreurs dans un ou des chmaps du formulaire.
 * @param triggerCritiqueRefetch - State pour engendrer le refetch des critiques.
 * @param {function} handleBoutonAfficherForm - Fonction pour afficher le formulaire.
 * @param {function} setError - Fonction pour set le state error.
 */
export async function ajouterNouvelleCritique(event, setListeCritiques, setMessageErreur, setErreurPresente, triggerCritiqueRefetch, handleBoutonAfficherForm, setError) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let nouvelleCritiqueInfo = obtenirNouvelleCritique(formData);

    if (!validerNouvelleCritique(formData, nouvelleCritiqueInfo, setMessageErreur,setErreurPresente)) {
        return;
    }

    setErreurPresente({eQualiteVisuel: false, eQualiteSonore: false, eAppreciation: false});
    
    try {
        let nouvelleCritique = await addCritique(nouvelleCritiqueInfo);
        setListeCritiques((anciennesCritiques) => [nouvelleCritique, ...anciennesCritiques]);
        // Réactualiser les critiques
        triggerCritiqueRefetch();
        // Cacher le formulaire
        handleBoutonAfficherForm();
        // Reset le message d'erreur
        setMessageErreur("");
    }
    catch (e) {
        console.log(e);
        setError({error: "error", message: e.message});
    }
    event.target.reset();
}

/**
 * Valide une nouvelle critique (champ par champ), et met en évidence les champs problématiques s'il y a lieu,
 * en plus de déterminer un message d'erreur à afficher s'il y a lieu
 *
 * @param {FormData} formData - Les données du formulaire.
 * @param {object} nouvelleCritique - La nouvelle critique.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 * @param {function} setErreurPresente - Fonction pour signaler s'il y a des erreurs dans un ou des chmaps du formulaire.
 * @returns {boolean} - True si la critique est valide, false sinon.
 */
function validerNouvelleCritique(formData, nouvelleCritique, setMessageErreur, setErreurPresente) {

    // Réinitialiser
    let erreurPresente = false;
    let valide = true;
    setMessageErreur(() => "");

    if (!validerStringsRemplies(formData.get("qualiteVisuelle"))) {
        erreurPresente = true;
        setErreurPresente(prevState => ({ ...prevState,eQualiteVisuelle: true}));
    }

    if (!validerStringsRemplies(formData.get("qualiteSonore"))) {
        erreurPresente = true;
        setErreurPresente(prevState => ({ ...prevState,eQualiteSonore: true}));
    }

    if (!validerStringsRemplies(formData.get("appreciation"))) {
        erreurPresente = true;
        setErreurPresente(prevState => ({ ...prevState,eAppreciation: true}));
    }

    if(erreurPresente){
        setMessageErreur((old) => old + "Tous les champs doivent être remplis\n");
        valide = false;
        erreurPresente = false;
    }

    if (!validerNote0A100(nouvelleCritique.qualiteVisuelle)) {
        erreurPresente = true;
        setErreurPresente(prevState => ({ ...prevState,eQualiteVisuelle: true}));
    }

    if (!validerNote0A100(nouvelleCritique.qualiteSonore)) {
        erreurPresente = true;
        setErreurPresente(prevState => ({ ...prevState,eQualiteSonore: true}));
    }

    if (!validerNote0A100(nouvelleCritique.appreciation)) {
        erreurPresente = true;
        setErreurPresente(prevState => ({ ...prevState,eAppreciation: true}));
    }

    if(erreurPresente){
        valide = false;
        setMessageErreur((old) => old + "Les notes doivent être entre 0 et 100\n");
    }

    return valide;
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
 * Retire une critique de la liste selon son ID.
 *
 * @param {Event} event - L'événement de clic sur le bouton de suppression.
 * @param {number} id - L'identifiant de la critique à supprimer.
 * @param {function} setListeCritiques - Fonction pour mettre à jour la liste des critiques.
 * @param triggerCritiqueRefetch - State pour engendrer le refetch des critiques.
 * @param {function} setError - Fonction pour set le state error.
 */
export async function retirerCritiqueParId(event, id, setListeCritiques, triggerCritiqueRefetch, setError) {
    event.preventDefault();

    try {
        await deleteCritiqueById(id);
        setListeCritiques(ancienneListe => ancienneListe.filter(critique => critique.id !== id));
        triggerCritiqueRefetch();
    }
    catch (e) {
        console.log('La destruction de ' + id + ' n\'a pas fonctionné');
        setError({error: "error", message: e.message});
    }
}

/**
 * Retire toutes les critiques de la liste qui ont un certain EIDR.
 *
 * @param {Event} event - L'événement de clic sur le bouton de suppression.
 * @param {number} eidr - L'EIDR du produit dont il faut supprimer les critiques.
 * @param {function} setListeCritiques - Fonction pour mettre à jour la liste des critiques.
 * @param triggerCritiqueRefetch - State pour engendrer le refetch des critiques.
 * @param {function} setError - Fonction pour set le state error.
 */
export async function retirerCritiquesParEidr(event, eidr, setListeCritiques, triggerCritiqueRefetch, setError) {
    event.preventDefault();

    try {
        await deleteCritiqueByEidr(eidr);
        setListeCritiques(ancienneListe => ancienneListe.filter(critique => critique.eidr !== eidr));
        triggerCritiqueRefetch();
    }
    catch (e) {
        console.log(e + "La destruction des critiques avec l'eidr " + id + " n'a pas fonctionné");
        setError({error: "error", message: e.message});
    }
}

/**
 * Obtient le nom du produit associé à un EIDR.
 *
 * @param {number} eidr - L'identifiant unique du produit.
 * @param {array} listeProduits - La liste de tous les produits.
 * @returns {string} - Le nom du produit, ou "Produit inconnu" si le produit n'est pas trouvé.
 */
export function obtenirNomProduitPourCritique(eidr, listeProduits) {
    const produit = listeProduits.find(produit => produit.eidr === eidr);
    return produit ? produit.nom : "Produit inconnu";
}
