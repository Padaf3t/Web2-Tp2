export default function SectionTitres({handleBoutonProduit,handleBoutonCritique,handleBoutonStatistique,handleBoutonAfficherForm,isShowingForm,isShowingStatistique,isShowingProduit,isShowingCritique,produitEnModification}){

    let textBoutonAjouter = "Ajouter";
    if(isShowingForm){
        textBoutonAjouter = "Annuler";
    }


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