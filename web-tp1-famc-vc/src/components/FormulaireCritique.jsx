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
    const refGestionnaire = useContext(GestionnaireReferenceCritiquesContext);

    const creerNouvelleCritique = (event) => {
        refGestionnaire.current.ajouterCritique(event, setMessageErreur);
    };

    return (
        <div className={style.formulaireDiv}>
            <h4 className={style.titreFormulaire}>Ajouter une critique</h4>
            <p>{messageErreur}</p>
            <form onSubmit={creerNouvelleCritique}>

                <label htmlFor="nomFilm">Nom du film</label><br/>
                <select name="nomFilm" id="nomFilm">
                    {listeProduits.map((produit) => (
                        <option key={produit.EIDR} value={produit.EIDR}>{produit.nom}</option>
                    ))}
                </select><br/>

                <label htmlFor="qualiteVisuelle">Qualité visuelle (%) :</label><br/>
                <input type="number" id="qualiteVisuelle" name="qualiteVisuelle"/><br/>
                <label htmlFor="qualiteSonore">Qualité sonore (%) :</label><br/>
                <input type="number" id="qualiteSonore" name="qualiteSonore"/><br/>
                <label htmlFor="appreciation">Appréciation (%) :</label><br/>
                <input type="number" id="appreciation" name="appreciation"/><br/>
                <button type='submit'>Ajouter la nouvelle critique</button>
            </form>
        </div>)
}