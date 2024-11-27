export default function SectionTitres({handleBoutonProduit,handleBoutonCritique,handleBoutonStatistique,handleBoutonAfficherForm,isShowingForm, isShowingStatistique, produitEnModification}){

    let textBoutonAjouter = "Ajouter";
    if(isShowingForm){
        textBoutonAjouter = "Annuler";
    }


    return(
        <>
            <div>
                <button onClick={handleBoutonProduit}><h1>Films</h1></button>
                <button onClick={handleBoutonCritique}><h1>Critiques</h1></button>
                <button onClick={handleBoutonStatistique}><h1>Statistiques</h1></button>
            </div>
            {!isShowingStatistique && !produitEnModification &&
            <div>
                <button onClick={handleBoutonAfficherForm}>{textBoutonAjouter}</button>
            </div>
            }
        </>
    )
}