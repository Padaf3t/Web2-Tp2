import {validerLongueurMaxString, validerNombrePositif, validerStringsRemplies} from "./fonctionnaliteUtilitaire.js";
import {ajouteProduits, deleteProduit, modifierProduitBackend} from "./httpProduits.js";
import {retirerCritiquesParEidr} from "./fonctionnaliteCritique.js";

/**
 * Sauvegarde un nouveau produit ou met à jour un produit existant.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 * @param {function} setListeProduits - Fonction pour mettre à jour la liste des produits.
 * @param {Array} listeProduits - La liste actuelle des produits.
 * @param {boolean} enModification - Indique si on est en mode modification.
 * @param {function} setEnModification - Fonction pour mettre à jour l'état de modification.
 * @param {function} setValeurFormulaire - Fonction pour mettre à jour les valeurs du formulaire.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 */
export async function sauvegarderProduit(event, setListeProduits, listeProduits, enModification, setEnModification, setValeurFormulaire, setMessageErreur, triggerRefetch) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let nouveauProduit = obtenirProduitDuFormulaire(formData);

    if (!validerNouveauProduit(formData, nouveauProduit, setMessageErreur)) {
        return;
    }

    if (!ModifierListeProduit(enModification, setEnModification, listeProduits, setListeProduits, setMessageErreur, setValeurFormulaire, nouveauProduit, triggerRefetch)) {
        return;
    }

    setMessageErreur("");
    event.target.reset();
}

/**
 * Récupère les informations d'un produit à partir d'un formulaire.
 *
 * @param {FormData} formData - Les données du formulaire.
 * @returns {Object} Un objet représentant un produit.
 */
function obtenirProduitDuFormulaire(formData) {

    let id = formData.get("id");
    let nom = formData.get("nom");
    let date = formData.get("date");
    let realisateur = formData.get("realisateur");
    let genre = formData.get("genre");
    let dureeMinute = formData.get("dureeMinute");
    let paysOrigine = formData.get("paysOrigine");
    let src = formData.get("src");

    return {
        eidr: Number(id),
        nom: nom,
        dateSortie: date,
        realisateur: realisateur,
        genre: genre,
        dureeMinute: dureeMinute,
        paysOrigine: paysOrigine,
        afficheSrc: src
    }
}

/**
 * Valide les données d'un nouveau produit.
 *
 * @param {FormData} formData - Les données du formulaire.
 * @param {Object} nouveauProduit - Le produit à valider.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 * @returns {boolean} True si le produit est valide, false sinon.
 */
function validerNouveauProduit(formData, nouveauProduit, setMessageErreur) {
    let longueurMax = 256;

    if (!validerStringsRemplies(formData.get("id"), nouveauProduit.nom, nouveauProduit.dateSortie, nouveauProduit.realisateur, nouveauProduit.dureeMinute, nouveauProduit.paysOrigine, nouveauProduit.afficheSrc)) {
        setMessageErreur("Tous les champs doivent être remplis");
        return false;
    }
    if (!validerLongueurMaxString(longueurMax, nouveauProduit.nom, nouveauProduit.realisateur, nouveauProduit.paysOrigine, nouveauProduit.afficheSrc)) {
        setMessageErreur("Les champs de texte doivent avoir moins de " + longueurMax + "caractères");
        return false;
    }
    if (!validerNombrePositif(Number(formData.get("id")), Number(formData.get("dureeMinute")))) {
        setMessageErreur("Les champs de nombres doivent être positifs");
        return false;
    }
    return true;
}

/**
 * Modifie la liste des produits en fonction du mode de modification.
 *
 * Si on est en mode création (enModification = false), ajoute le nouveau produit à la liste si l'EIDR est unique.
 * Si on est en mode modification (enModification = true), met à jour le produit existant ayant le même EIDR.
 *
 * @param {boolean} enModification - Indique si on est en mode modification.
 * @param {function} setEnModification - Fonction pour mettre à jour l'état de modification.
 * @param {Array} listeProduits - La liste actuelle des produits.
 * @param {function} setListeProduits - Fonction pour mettre à jour la liste des produits.
 * @param {function} setMessageErreur - Fonction pour afficher un message d'erreur.
 * @param {function} setValeurFormulaire - Fonction pour mettre à jour les valeurs du formulaire.
 * @param {Object} nouveauProduit - Le nouveau produit à ajouter ou à modifier.
 * @returns {boolean} True si l'opération s'est déroulée avec succès, false sinon.
 */
async function ModifierListeProduit(enModification, setEnModification, listeProduits, setListeProduits, setMessageErreur, setValeurFormulaire, nouveauProduit,triggerProduitRefetch) {
    if (!enModification) {
        if (validerNumeroEIDR(listeProduits, nouveauProduit.eidr)) {
            try{
                const nouvelId = await ajouteProduits(nouveauProduit);
                nouveauProduit.id = nouvelId;
                setListeProduits((ancienneListe) => [nouveauProduit, ...ancienneListe]);
                triggerProduitRefetch();
            } catch (e) {
                console.log(e + 'le nouveau produit n\'a pas pu être ajouté');
                //setError({error: "error", message: e.message});
            }
        } else {
            setMessageErreur("Le numéro EIDR " + nouveauProduit.eidr + " existe déjà")
            return false;
        }
    } else {
        setEnModification(false);
        try{
            await modifierProduitBackend(nouveauProduit)
            setListeProduits((liste) => {
                return liste.map(produit => {
                    return produit.eidr === nouveauProduit.eidr ? nouveauProduit : produit
                })
            });
            triggerProduitRefetch();
            setValeurFormulaire(() => getValeurFormulaireVide())
        } catch (e) {
            console.log('la modification du produit n\'a pas pu être effectué');
            //setError({error: "error", message: e.message});
        }


    }
    return true;
}

/**
 * Modifie un produit existant.
 *
 * @param {function} setValeurFormulaire - Fonction pour mettre à jour les valeurs du formulaire.
 * @param {function} setEnModification - Fonction pour mettre à jour l'état de modification.
 * @param {Object} produit - Le produit à modifier.
 */
export function modifierProduit(setValeurFormulaire, setEnModification, produit) {
    setEnModification(true);
    setValeurFormulaire(() => ({
        titreFormulaire: "Modifier le film (" + produit.nom + ")",
        titreBouton: "Modifier",
        eidr: produit.eidr,
        nom: produit.nom,
        dateSortie: new Date(produit.dateSortie).toISOString().split('T')[0],
        realisateur: produit.realisateur,
        genre: produit.genre,
        dureeMinute: produit.dureeMinute,
        paysOrigine: produit.paysOrigine,
        afficheSrc: produit.afficheSrc
    }));
    window.scrollTo(0, 0);
}

/**
 * Retourne un objet contenant les valeurs par défaut pour le formulaire.
 *
 * @returns {Object} Un objet avec les valeurs initiales du formulaire.
 */
export function getValeurFormulaireVide() {
    return {
        titreFormulaire: "Ajouter un nouveau film",
        titreBouton: "Ajouter",
        eidr: "",
        nom: "",
        dateSortie: "",
        realisateur: "",
        genre: "",
        dureeMinute: "",
        paysOrigine: "",
        afficheSrc: ""
    }
}

/**
 * Met à jour la valeur du champ "genre" dans le formulaire.
 *
 * @param {Event} event - L'événement de changement du champ.
 * @param {function} setValeurFormulaire - Fonction pour mettre à jour les valeurs du formulaire.
 */
export function modifierValeurEnumGenre(event, setValeurFormulaire) {
    setValeurFormulaire((valeurFormulaire) => ({...valeurFormulaire, genre: event.target.value}))
}

/**
 * Supprime un produit et ses critiques associées.
 *
 * @param {Event} event - L'événement de suppression.
 * @param {number} eidr - L'EIDR du produit à supprimer.
 * @param {function} setListeProduits - Fonction pour mettre à jour la liste des produits.
 * @param {function} fonctCritiques - Fonction pour gérer les critiques.
 * @param {Array} listeCritiques - La liste des critiques.
 * @param {function} setListeCritiques - Fonction pour mettre à jour la liste des critiques.
 */
export async function supprimerUnProduit(event, eidr, setListeProduits, fonctCritiques, listeCritiques, setListeCritiques, triggerProduitRefetch, triggerCritiqueRefetch) {
    event.preventDefault();

    try{
        await fonctCritiques.retirerCritiquesParEidr(event, eidr, setListeCritiques, triggerCritiqueRefetch);
        await deleteProduit(eidr);
        setListeProduits(old => {
            return old.filter(p => p.eidr !== eidr)});
        triggerProduitRefetch();
    }
    catch(e){
        console.log('le produit n\'a pu être supprimé');
        //setError({error: "error", message: e.message});
    }
}

/**
 * Annule la modification en cours.
 *
 * @param {Event} event - L'événement d'annulation.
 * @param {function} setEnModification - Fonction pour mettre à jour l'état de modification.
 * @param {function} setValeurFormulaire - Fonction pour mettre à jour les valeurs du formulaire.
 */
export function annulerModification(event, setEnModification, setValeurFormulaire) {
    setValeurFormulaire(getValeurFormulaireVide());
    setEnModification(false);
    event.target.parentNode.reset();
}

/**
 * Enregistre la liste des produits dans le localStorage.
 *
 * @param {Array} listeProduits - La liste des produits à enregistrer.
 */
export function setLocalStorageProduits(listeProduits) {
    if (localStorage.getItem("produitsStorage") !== null) {
        localStorage.removeItem("produitsStorage");
    }
    localStorage.setItem("produitsStorage", JSON.stringify(listeProduits));
}

/**
 * Vérifie si un numéro EIDR existe déjà dans la liste des produits.
 *
 * @param {Array} listeProduit - La liste des produits.
 * @param {number} EIDR - Le numéro EIDR à vérifier.
 * @returns {boolean} True si le numéro EIDR n'existe pas, false sinon.
 */
function validerNumeroEIDR(listeProduit, eidr) {
    return !listeProduit.some((produit) => produit.eidr === eidr);
}