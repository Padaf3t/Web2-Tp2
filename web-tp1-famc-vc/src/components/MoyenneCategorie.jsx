import {useContext, useEffect, useState} from "react";
import GestionnaireReferenceStatistiquesContext from "./contexts/GestionnaireReferenceStatistiquesContext.jsx";

/**
 * Composant qui affiche la moyenne des notes pour une catégorie de produits donnée.
 * @param {MoyenneCategorieProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant rendu.
 */
export default function MoyenneCategorie({listeProduitGenre, titreGenre}) {

    const refGestionnaire = useContext(GestionnaireReferenceStatistiquesContext);

    const [moyenne, setMoyenne] = useState();

    /**
     * Sert à lier le calcul des moyennes par genre à la liste de produits pour ce genre
     */
    useEffect(() => {
        const moyenneDuGenre = refGestionnaire.current.obtenirListeProduitsGenreAvecMoyenne(listeProduitGenre);
        setMoyenne(moyenneDuGenre);
    }, [listeProduitGenre]);

    return (
        <span>
            <p>{titreGenre} : {moyenne !== null ? moyenne + '%' : "N/A"} </p>
        </span>
    );
}