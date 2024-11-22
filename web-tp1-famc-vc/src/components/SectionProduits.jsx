import Produit from "./Produit.jsx";

/**
 * Composant SectionProduit qui affiche une liste de films
 * et permet d'ajouter des éléments enfants.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.listeProduits - Liste des produits (films) à afficher.
 * @param {Object} props.produitEnModification - Le produit actuellement en modification (s'il y en a un).
 * @param {React.ReactNode} props.children - Éléments enfants à afficher en dessous de la liste de produits.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function SectionProduit({listeProduits, produitEnModification, children}){

    return (
        <div className="sectionDiv">
            <h1>Films</h1>
            <div className="contenuSectionDiv">
                {!produitEnModification && listeProduits.map((produit) => (
                    <Produit key={produit.EIDR} {...produit}/>
                ))}
            </div>
            {children}
        </div>
    )

}