import {forwardRef, useImperativeHandle} from "react";

/**
 * Composant qui gère les calculs de statistiques sur les produits et les critiques.
 * @param {GestionnaireStatistiquesProps} props - Les propriétés du composant.
 * @param {React.ForwardedRef<GestionnaireStatistiquesProps>} ref - Une référence au composant.
 * @returns {JSX.Element} Le composant rendu.
 */
const GestionnaireStatistiques = forwardRef((props, ref) => {
    const{listeProduits, listeCritiques, lorsquePret, fonctionnaliteStatistique} = props;

    useImperativeHandle(ref, () => {
        //S'assure que le composant est prêt et force un rerendu si tel est le cas
        if (lorsquePret) {
            lorsquePret();
        }
        return {
            /**
             * Obtient la liste des produits avec leurs moyennes de critiques.
             * @returns {Array} Liste des produits avec leurs moyennes.
             */
            obtenirListeProduitsAvecMoyenne: () =>{
                return fonctionnaliteStatistique.obtenirListeProduitsMoyenneOrdonne(listeProduits, listeCritiques);
            },

            /**
             * Combine les listes de produits par genre et calcule la moyenne des critiques pour chaque genre.
             * @param {Produit[]} listeProduitsGenre - La liste des produits par genre.
             * @returns {Produit[]} La liste des produits avec leur moyenne de critique par genre.
             */
            obtenirListeProduitsGenreAvecMoyenne: (listeProduitsGenre) =>{
                return fonctionnaliteStatistique.combinerTotalMoyenneProduit(listeProduitsGenre, listeCritiques);
            },

            /**
             * Crée une map (dictionnaire) qui associe chaque catégorie de produit à une liste de produits.
             * @returns {Map<string, Produit[]>} Une map où la clé est la catégorie et la valeur est un tableau de produits.
             */
            obtenirMapCategorieProduit: () => {
                return fonctionnaliteStatistique.obtenirMapCategorieProduit(listeProduits);
            }

        }
    });
});

export default GestionnaireStatistiques;