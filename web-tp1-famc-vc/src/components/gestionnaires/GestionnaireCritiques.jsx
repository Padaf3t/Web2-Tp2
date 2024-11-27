import {forwardRef, useImperativeHandle} from "react";

/**
 * Composant qui gère les critiques pour une liste de produits.
 * @param {GestionnaireCritiquesProps} props - Props du composant.
 * @param {React.ForwardedRef<GestionnaireCritiquesProps>} ref - Référence au composant.
 * @returns {JSX.Element} Le composant rendu.
 */
const GestionnaireCritiques = forwardRef((props, ref) => {
    const{listeProduits, setListeCritiques, lorsquePret, fonctionnaliteCritique, triggerCritiqueRefetch} = props;
    useImperativeHandle(ref, () => {
        //S'assure que le composant est prêt et force un rerendu si tel est le cas
        if (lorsquePret) {
            lorsquePret();
        }
        return {
            /**
             * Ajoute une nouvelle critique.
             * @param {Event} event - L'événement déclencheur.
             * @param {Function} setMessageErreur - Fonction pour mettre à jour le message d'erreur.
             */
            ajouterCritique: (event, setMessageErreur) => {
                fonctionnaliteCritique.ajouterNouvelleCritique(event, setListeCritiques, setMessageErreur, triggerCritiqueRefetch);
            },
            /**
             * Supprime la critique spécifiée.
             * @param {Event} event - L'événement déclencheur.
             * @param {number} id - L'identifiant de la critique à supprimer.
             */
            supprimerCritiqueParId: (event, id) => {
                fonctionnaliteCritique.retirerCritiqueParId(event, id, setListeCritiques, triggerCritiqueRefetch);
            },
            /**
             * Supprime la critique spécifiée.
             * @param {Event} event - L'événement déclencheur.
             * @param {number} id - L'identifiant de la critique à supprimer.
             */
            supprimerCritiquesParEidr: (event, eidr) => {
                fonctionnaliteCritique.retirerCritiquesParEidr(event, eidr, setListeCritiques, triggerCritiqueRefetch);
            },
            /**
             * Obtient le nom du produit associé à une critique spécifiée.
             * @param {number} EIDR - L'identifiant du produit.
             * @returns {string} Le nom du produit.
             */
            obtenirNomProduitPourCritique: (eidr) => {
                return fonctionnaliteCritique.obtenirNomProduitPourCritique(eidr, listeProduits);
            },

        }
    });
});

export default GestionnaireCritiques;