import ElementStatistique from "./ElementStatistique.jsx";
import {useContext, useEffect, useState} from "react";
import GestionnaireReferenceStatistiquesContext from "./contexts/GestionnaireReferenceStatistiquesContext.jsx";

/**
 * Composant SectionStatistique qui affiche des statistiques sur les films
 * basées sur la liste de produits et de critiques.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.listeProduits - Liste des produits (films) pour le calcul des statistiques.
 * @param {Array} props.listeCritiques - Liste des critiques à prendre en compte pour les statistiques.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function SectionStatistique({listeProduits, listeCritiques, children}) {

    const refGestionnaire = useContext(GestionnaireReferenceStatistiquesContext);
    const [listeProduitsAvecMoyenne, setListeProduitsAvecMoyenne] = useState([]);

    /**
     * Permet de rafraichir le composant lorsque la listeProduit ou listeCritique est changée
     */
    useEffect(() => {
        const produitsAvecMoyenne = refGestionnaire.current.obtenirListeProduitsAvecMoyenne();
        setListeProduitsAvecMoyenne(produitsAvecMoyenne);
    }, [listeProduits, listeCritiques]);

    return (
        <div className="sectionDiv">
            <h2>Films par popularité</h2>
            <div className="contenuSectionDiv">
                {listeProduitsAvecMoyenne.map((produit) => (
                    <ElementStatistique
                        key={produit.eidr}
                        nom={produit.nom}
                        afficheSrc={produit.afficheSrc}
                        moyenne={produit.moyenne}
                    />
                ))}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}