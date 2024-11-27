import styles from "../style/Produit.module.css";
import {useContext} from "react";
import GestionnaireReferenceProduitsContext from "./contexts/GestionnaireReferenceProduitsContext.jsx";

/**
 * Composant Produit qui affiche les détails d'un produit (film)
 * ainsi que des options pour le supprimer ou le modifier.
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.eidr - L'identifiant du produit.
 * @param {string} props.nom - Le nom du film.
 * @param {string} props.dateSortie - La date de sortie du film.
 * @param {string} props.realisateur - Le réalisateur du film.
 * @param {string} props.genre - Le genre du film.
 * @param {number} props.dureeMinute - La durée du film en minutes.
 * @param {string} props.paysOrigine - Le pays d'origine du film.
 * @param {string} props.afficheSrc - L'URL de l'affiche du film.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function Produit({...produit}){

    const {eidr, nom, dateSortie, realisateur, genre, dureeMinute, paysOrigine, afficheSrc} = produit;
    const refGestionnaire = useContext(GestionnaireReferenceProduitsContext);

    /**
     * Fonction pour supprimer le produit.
     * @param {Event} event - L'événement déclencheur.
     */
    const supprimerProduit = ((event) => {
        refGestionnaire.current.supprimerProduit(event,eidr);
    })

    /**
     * Fonction pour entrer en mode modification du produit.
     */
    const modifierProduit = (() => {
        refGestionnaire.current.entrerModeModifierProduit(produit);
    })

    return (
        <div className={["elementDiv", styles.produitDiv].join(" ")}>
            <button onClick={supprimerProduit}>X</button>
            <button onClick={modifierProduit}>Modifier</button>
            <img src={afficheSrc} width="100px" alt="Image du film"/>
            <div>
                <h4 className={styles.nomProduit}>{nom}</h4>
                <br/>{dateSortie}<br/>{realisateur}<br/>{genre}<br/>{dureeMinute} minutes<br/>{paysOrigine}
            </div>
        </div>
    )

}