import styles from '../style/Critique.module.css';
import {useContext, useState} from "react";
import GestionnaireReferenceCritiquesContext from "./contexts/GestionnaireReferenceCritiquesContext.jsx";
import ModalSupression from "./ModalSupression.jsx";

/**
 * Composant Critique qui affiche les détails d'une critique de film.
 * @param critique Les informations de la critique
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function Critique({...critique}){

    const {id, eidr, date, qualiteVisuelle, qualiteSonore, appreciation, moyenne} = critique;

    const refGestionnaire = useContext(GestionnaireReferenceCritiquesContext);
    const [showModal, setShowModal] = useState(false);

    /**
     * Fonction pour supprimer la critique.
     * @param {Event} event - L'événement déclencheur.
     */
    const supprimerCritique = (event) => {
        refGestionnaire.current.supprimerCritiqueParId(event, id);
        setShowModal(false);
    };

    const nomProduit = refGestionnaire.current?.obtenirNomProduitPourCritique(eidr);


    return <div className={["elementDiv", styles.critiqueDiv].join(" ")} >
        <button onClick={() => setShowModal(true)}>X</button>
        <ModalSupression show={showModal}
                         handleClose={() => setShowModal(false)}
                         onConfirm={supprimerCritique}
                         bodyTexte={"Êtes-vous sûr de vouloir supprimer cette critique ? Cette action est irréversible."}/>
        <div className={styles.titreCritique}>Critique du film <br/> <span className={styles.nomProduit}>{nomProduit}</span></div>
        <p>Qualité visuelle : {qualiteVisuelle}%</p>
        <p>Qualité sonore : {qualiteSonore}%</p>
        <p>Appréciation : {appreciation}%</p>
        <p>Moyenne des notes : {moyenne}%</p>
        <p>Fait le : {date}</p>
    </div>
}