import {useContext, useState} from "react";
import style from '../style/Formulaire.module.css';
import GestionnaireReferenceCritiquesContext from "./contexts/GestionnaireReferenceCritiquesContext.jsx";

/**
 * Composant FormulaireCritique permettant d'ajouter une nouvelle critique.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.listeProduits - Liste des produits disponibles.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function FormulaireCritique({listeProduits}) {

    const [messageErreur, setMessageErreur] = useState("");
    const [erreurPresente, setErreurPresente] = useState({eQualiteVisuelle: false, eQualiteSonore: false, eAppreciation: false})

    const refGestionnaire = useContext(GestionnaireReferenceCritiquesContext);

    /**
     * Permet de créer une nouvelle critique via gestionnaire
     * @param {Event} event - L'événement de clic
     */
    const creerNouvelleCritique = (event) => {
        refGestionnaire.current.ajouterCritique(event, setMessageErreur, setErreurPresente);
    };

    /**
     * Fonction permettant de vérifier si une erreur est présente afin de changer la classe de style de l'élément
     * @param erreurKey - La clé dans l'objet erreurPresente
     * @returns {*|string} la classe de style résultante
     */
    const getInputClass = (erreurKey) => erreurPresente[erreurKey] ? style.inputError : '';

    return (
        <div className={style.formulaireDiv}>
            <h4 className={style.titreFormulaire}>Ajouter une critique</h4>
            <p>
                {messageErreur.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br/>
                    </span>
                ))}
            </p>
            <form onSubmit={creerNouvelleCritique}>

                <label htmlFor="nomFilm">Nom du film</label><br/>
                <select name="nomFilm" id="nomFilm">
                    {listeProduits.map((produit) => (
                        <option key={produit.eidr} value={produit.eidr}>{produit.nom}</option>
                    ))}
                </select><br/>

                <label htmlFor="qualiteVisuelle">Qualité visuelle (%) :</label><br/>
                <input type="number" id="qualiteVisuelle" name="qualiteVisuelle" className={getInputClass('eQualiteVisuelle')}/><br/>
                <label htmlFor="qualiteSonore">Qualité sonore (%) :</label><br/>
                <input type="number" id="qualiteSonore" name="qualiteSonore" className={getInputClass('eQualiteSonore')}/><br/>
                <label htmlFor="appreciation">Appréciation (%) :</label><br/>
                <input type="number" id="appreciation" name="appreciation" className={getInputClass('eAppreciation')}/><br/>
                <button type='submit'>Ajouter la nouvelle critique</button>
            </form>
        </div>)
}