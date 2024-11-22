import styles from '../style/Critique.module.css';
import {useContext} from "react";
import GestionnaireReferenceCritiquesContext from "./contexts/GestionnaireReferenceCritiquesContext.jsx";

/**
 * Composant Critique qui affiche les détails d'une critique de film.
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.id - L'identifiant de la critique.
 * @param {number} props.EIDR - L'identifiant du produit associé à la critique.
 * @param {number} props.qualiteVisuelle - La note de qualité visuelle.
 * @param {number} props.qualiteSonore - La note de qualité sonore.
 * @param {number} props.appréciation - La note d'appréciation.
 * @param {number} props.moyenne - La moyenne des notes.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function Critique({...critique}){

    const {id, EIDR, date, qualiteVisuelle, qualiteSonore, appreciation, moyenne} = critique;

    const refGestionnaire = useContext(GestionnaireReferenceCritiquesContext);

    /**
     * Fonction pour supprimer la critique.
     * @param {Event} event - L'événement déclencheur.
     */
    const supprimerCritique = (event) => {
        refGestionnaire.current.supprimerCritique(event, id);
    };

    const nomProduit = refGestionnaire.current?.obtenirNomProduitPourCritique(EIDR);


    return <div className={["elementDiv", styles.critiqueDiv].join(" ")} >
        <button onClick={supprimerCritique}>X</button>
        <div className={styles.titreCritique}>Critique du film <br/> <span className={styles.nomProduit}>{nomProduit}</span></div>
        <p>Qualité visuelle : {qualiteVisuelle}%</p>
        <p>Qualité sonore : {qualiteSonore}%</p>
        <p>Appréciation : {appreciation}%</p>
        <p>Moyenne des notes : {moyenne}%</p>
        <p>Fait le : {date}</p>
    </div>
}