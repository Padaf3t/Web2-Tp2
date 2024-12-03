import sousCategorie from "../enum/SousCategorie.js";
import {useContext, useState} from "react";
import GestionnaireReferenceProduitsContext from "./contexts/GestionnaireReferenceProduitsContext.jsx";
import style from "../style/Formulaire.module.css";

/**
 * Composant FormulaireProduit permettant d'ajouter ou de modifier un produit.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.valeurFormulaire - Les valeurs initial du formulaire.
 * @param {Object} props.produitEnModification - L'objet que le produit est en modification.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function FormulaireProduit({valeurFormulaire, produitEnModification}){

    const [messageErreur, setMessageErreur] = useState("");
    const [erreurPresente, setErreurPresente] = useState({eEidr: false, eNom: false, eDate: false, eRealisateur: false, eDuree: false, ePays: false, eSrc: false})
    const refGestionnaire = useContext(GestionnaireReferenceProduitsContext);

    /**
     * Fonction de soumission du formulaire pour sauvegarder un produit.
     * @param {Event} e - L'événement de soumission du formulaire.
     */
    function submitFormulaireProduit(e){
        refGestionnaire.current.sauvegarderProduit(e, [messageErreur, setMessageErreur], setErreurPresente);
    }

    /**
     * Fonction pour modifier l'énumération genre.
     * @param {Event} e - L'événement de changement du genre.
     */
    function modifierEnumGenre(e){
        refGestionnaire.current.modifierEnumGenre(e)
    }

    /**
     * Fonction pour annuler la modification en cours du produit.
     * @param {Event} e - L'événement de clic sur le bouton d'annulation.
     */
    function annulerModification(e){
        refGestionnaire.current.sortirModeModifierProduit(e);
    }

    const getInputClass = (erreurKey) => erreurPresente[erreurKey] ? style.inputError : '';

    let enModificationClassGrise = produitEnModification ? style.inputGrise : '';

    return (
        <div className={style.formulaireDiv}>
            <h4 className={style.titreFormulaire}>{valeurFormulaire.titreFormulaire}</h4>
            <p>
                {messageErreur.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br/>
                    </span>
                ))}
            </p>
            <form onSubmit={submitFormulaireProduit}>
                <label htmlFor="id">EIDR:</label><br/>
                <input type="number" id="id" name="id" readOnly={produitEnModification}
                       className={`${enModificationClassGrise} ${getInputClass('eEidr')}`}
                       defaultValue={valeurFormulaire.eidr}/><br/>
                <label htmlFor="nom">Nom du film:</label><br/>
                <input type="text" id="nom" name="nom" defaultValue={valeurFormulaire.nom} readOnly={produitEnModification} className={`${enModificationClassGrise} ${getInputClass('eNom')}`}/><br/>
                <label htmlFor="date">Date de sortie:</label><br/>
                <input type="date" id="date" name="date" defaultValue={valeurFormulaire.dateSortie} className={getInputClass('eDate')}/><br/>
                <label htmlFor="realisateur">Réalisateur:</label><br/>
                <input type="text" id="realisateur" name="realisateur" className={getInputClass('eRealisateur')}
                       defaultValue={valeurFormulaire.realisateur}/><br/>
                <label htmlFor="genre">Genre:</label><br/>
                <select name="genre" id="genre" value={valeurFormulaire.genre} onChange={modifierEnumGenre}>
                    {Object.values(sousCategorie).map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select><br/>
                <label htmlFor="dureeMinute">Durée en minutes:</label><br/>
                <input type="number" id="dureeMinute" name="dureeMinute" className={getInputClass('eDuree')}
                       defaultValue={valeurFormulaire.dureeMinute}/><br/>
                <label htmlFor="paysOrigine">Pays d'origine:</label><br/>
                <input type="text" id="paysOrigine" name="paysOrigine" className={getInputClass('ePays')}
                       defaultValue={valeurFormulaire.paysOrigine}/><br/>
                <label htmlFor="src">Source de l'image:</label><br/>
                <input type="text" id="src" name="src" className={getInputClass('eSrc')}
                       defaultValue={valeurFormulaire.afficheSrc}/><br/>
                <button type='submit'>{valeurFormulaire.titreBouton}</button>
                {produitEnModification && <button onClick={annulerModification}>Annuler la modification</button>}
            </form>

        </div>
    )
}