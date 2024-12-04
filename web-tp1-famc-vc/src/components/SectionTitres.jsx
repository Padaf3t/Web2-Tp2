/**
 * Composant gérant la section des titres de sections et du boutons pour afficher le formulaire
 * @param {function} handleBoutonProduit - Permet d'handle le comportement du bouton produit
 * @param {function} handleBoutonCritique - Permet d'handle le comportement du bouton critique
 * @param {function} handleBoutonStatistique - Permet d'handle le comportement du bouton statistique
 * @param {function} handleBoutonAfficherForm - Permet d'handle le comportement du bouton du formulaire
 * @param {boolean} isShowingForm - Formulaire afficher ou non
 * @param {boolean} isShowingStatistique - Section statistique afficher ou non
 * @param {boolean} isShowingProduit  - Section produit afficher ou non
 * @param {boolean} isShowingCritique - Section critique afficher ou non
 * @param {boolean} produitEnModification - produit est en modification ou non
 * @returns {JSX.Element}
 * @constructor
 */
export default function SectionTitres({handleBoutonProduit,handleBoutonCritique,handleBoutonStatistique,handleBoutonAfficherForm,isShowingForm,isShowingStatistique,isShowingProduit,isShowingCritique,produitEnModification}){

    let textBoutonAjouter = isShowingForm ? "Annuler" : "Ajouter";

    return(
        <>
            <div id={"titresDiv"}>
                <button onClick={handleBoutonProduit} className={isShowingProduit ? "titreButtonSelected" : "titreButtonUnselected"}><h1>Films</h1></button>
                <button onClick={handleBoutonCritique} className={isShowingCritique ? "titreButtonSelected" : "titreButtonUnselected"}><h1>Critiques</h1></button>
                <button onClick={handleBoutonStatistique} className={isShowingStatistique ? "titreButtonSelected" : "titreButtonUnselected"}><h1>Statistiques</h1></button>
            </div>
            {!isShowingStatistique && !produitEnModification && (isShowingProduit || isShowingCritique) &&
            <div id={"divAfficherFormButton"}>
                <button onClick={handleBoutonAfficherForm}>{textBoutonAjouter}</button>
            </div>
            }
        </>
    )
}