import Produit from "./Produit.jsx";
import FetchingElement from "./FetchingElement.jsx";

/**
 * Composant SectionProduit qui affiche une liste de films
 * et permet d'ajouter des éléments enfants.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.listeProduits - Liste des produits (films) à afficher.
 * @param {Object} props.produitEnModification - Le produit actuellement en modification (s'il y en a un).
 * @param {React.ReactNode} props.children - Éléments enfants à afficher en dessous de la liste de produits.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function SectionProduit({listeProduits, produitEnModification, isShowingForm, isFetching, children}){

    return (
        <div className="sectionDiv">
            <div className="contenuSectionDiv">
                {!isFetching ?
                !produitEnModification && !isShowingForm && listeProduits.map((produit) => (
                    <Produit key={produit.eidr} {...produit}/>
                ))
                    : <FetchingElement isFetching={isFetching}/>
                }
            </div>
            {children}
        </div>
    )

}