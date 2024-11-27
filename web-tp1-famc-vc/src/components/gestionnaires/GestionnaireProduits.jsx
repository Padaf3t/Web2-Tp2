import {forwardRef, useImperativeHandle} from "react";

/**
 * Composant qui gère les opérations liées aux produits, telles que la sauvegarde, la modification et la suppression.
 * Il interagit également avec les critiques associées aux produits.
 * @param {GestionnaireProduitsProps} props - Les propriétés du composant.
 * @param {React.ForwardedRef<GestionnaireProduitsProps>} ref - Une référence au composant.
 * @returns {JSX.Element} Le composant rendu.
 */
const GestionnaireProduits = forwardRef((props, ref) => {
    const{listeProduits, setListeProduits, setListeCritiques,listeCritiques,produitEnModification,
        setProduitEnModification, setValeurFormulaire, lorsquePret, fonctionnaliteProduit, fonctionnaliteCritique,
        triggerProduitRefetch, triggerCritiqueRefetch, handleBoutonAfficherForm} = props;

    useImperativeHandle(ref, () => {
        //S'assure que le composant est prêt et force un rerendu si tel est le cas
        if (lorsquePret) {
            lorsquePret();
        }
        return {
            /**
             * Sauvegarde le produit actuellement modifié.
             * @param {Event} event - L'événement déclencheur.
             * @param {Function} setMessageErreur - Fonction pour mettre à jour le message d'erreur.
             */
            sauvegarderProduit: (event, setMessageErreur) => {
                fonctionnaliteProduit.sauvegarderProduit(event, setListeProduits, listeProduits, produitEnModification, setProduitEnModification, setValeurFormulaire, setMessageErreur, triggerProduitRefetch,handleBoutonAfficherForm)
            },
            /**
             * Met le produit spécifié en mode de modification.
             * @param {Object} produit - Le produit à modifier.
             */
            entrerModeModifierProduit: (produit) => {
                fonctionnaliteProduit.modifierProduit(setValeurFormulaire, setProduitEnModification, produit);
            },
            /**
             * Annule la modification en cours du produit.
             * @param {Event} event - L'événement déclencheur.
             */
            sortirModeModifierProduit: (event) => {
                fonctionnaliteProduit.annulerModification(event, setProduitEnModification, setValeurFormulaire)
            },
            /**
             * Modifie la valeur de l'énumération genre du produit.
             * @param {Event} event - L'événement déclencheur.
             */
            modifierEnumGenre: (event) => {
                fonctionnaliteProduit.modifierValeurEnumGenre(event, setValeurFormulaire)
            },
            /**
             * Supprime le produit spécifié.
             * @param {Event} event - L'événement déclencheur.
             * @param {number} EIDR - L'identifiant du produit à supprimer.
             */
            supprimerProduit: (event, eidr) => {
                fonctionnaliteProduit.supprimerUnProduit(event, eidr, setListeProduits, fonctionnaliteCritique, listeCritiques, setListeCritiques, triggerProduitRefetch, triggerCritiqueRefetch);
            },

        }
    });
});

export default GestionnaireProduits;