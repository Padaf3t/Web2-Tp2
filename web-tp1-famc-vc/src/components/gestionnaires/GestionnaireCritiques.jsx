import {forwardRef, useImperativeHandle} from "react";

/**
 * Composant qui gère les critiques pour une liste de produits.
 * @param {GestionnaireCritiquesProps} props - Props du composant.
 * @param {React.ForwardedRef<GestionnaireCritiquesProps>} ref - Référence au composant.
 * @returns {JSX.Element} Le composant rendu.
 */
const GestionnaireCritiques = forwardRef((props, ref) => {
    const{listeProduits, setListeCritiques, lorsquePret, fonctionnaliteCritique, triggerCritiqueRefetch,handleBoutonAfficherForm, setError} = props;
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
             * @param {function} setErreurPresente - Fonction pour signaler s'il y a des erreurs dans un ou des champs du formulaire.
             */
            ajouterCritique: (event, setMessageErreur,setErreurPresente) => {
                fonctionnaliteCritique.ajouterNouvelleCritique(event, setListeCritiques, setMessageErreur, setErreurPresente, triggerCritiqueRefetch, handleBoutonAfficherForm, setError);
            },
            /**
             * Supprime la critique spécifiée.
             * @param {Event} event - L'événement déclencheur.
             * @param {number} id - L'identifiant de la critique à supprimer.
             */
            supprimerCritiqueParId: (event, id) => {
                fonctionnaliteCritique.retirerCritiqueParId(event, id, setListeCritiques, triggerCritiqueRefetch, setError);
            },
            /**
             * Supprime la critique spécifiée.
             * @param {Event} event - L'événement déclencheur.
             * @param {number} eidr - L'eidr de produit dont il faut supprimer les critiques.
             */
            supprimerCritiquesParEidr: (event, eidr) => {
                fonctionnaliteCritique.retirerCritiquesParEidr(event, eidr, setListeCritiques, triggerCritiqueRefetch, setError);
            },
            /**
             * Obtient le nom du produit associé à une critique spécifiée.
             * @param {number} eidr - L'identifiant du produit.
             * @returns {string} Le nom du produit.
             */
            obtenirNomProduitPourCritique: (eidr) => {
                return fonctionnaliteCritique.obtenirNomProduitPourCritique(eidr, listeProduits);
            },

        }
    });
});

export default GestionnaireCritiques;