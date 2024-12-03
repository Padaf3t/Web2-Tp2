import {useRef, useState, useEffect} from "react";
import SectionCritiques from "./components/SectionCritiques.jsx";
import SectionProduit from "./components/SectionProduits.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import SectionStatistique from "./components/SectionStatistiques.jsx";
import FormulaireCritique from "./components/FormulaireCritique.jsx";
import GestionnaireProduits from "./components/gestionnaires/GestionnaireProduits.jsx";
import FormulaireProduit from "./components/FormulaireProduit.jsx";
import GestionnaireReferenceProduitsContext from "./components/contexts/GestionnaireReferenceProduitsContext.jsx";
import GestionnaireCritiques from "./components/gestionnaires/GestionnaireCritiques.jsx";
import GestionnaireStatistiques from "./components/gestionnaires/GestionnaireStatistiques.jsx";
import GestionnaireReferenceCritiquesContext from "./components/contexts/GestionnaireReferenceCritiquesContext.jsx";
import GestionnaireReferenceStatistiquesContext from "./components/contexts/GestionnaireReferenceStatistiquesContext.jsx";
import MoyenneCategorie from "./components/MoyenneCategorie.jsx";
import * as fonctionnaliteStatistique from "./script/fonctionnaliteStatistiques.js";
import * as fonctionnaliteCritique from "./script/fonctionnaliteCritique.js";
import * as fonctionnaliteProduit from "./script/fonctionnaliteProduit.js"
import style from './style/Statistique.module.css'
import {fetchAvailableProduitsAsync} from "./script/httpProduits.js";
import {fetchAvailableCritiquesAsync} from "./script/httpCritiques.js";
import SectionTitres from "./components/SectionTitres.jsx";

function App() {

    //Accès aux données
    //let critiquesStorage = localStorage.getItem("critiquesStorage") !== null ? JSON.parse(localStorage.getItem("critiquesStorage")) : critiques;
    //let produitsStorage = localStorage.getItem("produitsStorage") !== null ? JSON.parse(localStorage.getItem("produitsStorage")) : films;

    //State
    const [listeProduits, setListeProduits] = useState([]);
    const [listeCritiques, setListeCritiques] = useState([]);
    const [valeurFormulaire, setValeurFormulaire] = useState(fonctionnaliteProduit.getValeurFormulaireVide());
    const [produitEnModification, setProduitEnModification] = useState(false);
    const [, setEstPret] = useState(false);
    const [error, setError] = useState({error: "none", message: ""});
    const [isFetching, setIsFetching] = useState(false);
    const [triggerProduitRefetch, setTriggerProduitRefetch] = useState(false);
    const [triggerCritiqueRefetch, setTriggerCritiqueRefetch] = useState(false);

    const [isShowingProduit, setIsShowingProduit] = useState(false);
    const [isShowingCritique, setIsShowingCritique] = useState(false);
    const [isShowingStatistique, setIsShowingStatistique] = useState(false);
    const [isShowingForm, setIsShowingForm] = useState(false);

    //Ref
    const gestionnaireProduitsRef = useRef(null);
    const gestionnaireCritiquesRef = useRef(null);
    const gestionnaireStatistiquesRef = useRef(null);

    const mapCategorieProduit = fonctionnaliteStatistique.obtenirMapCategorieProduit(listeProduits);

    //Fonction pour rendre prête la reférence des gestionnaires
    const gestionnaireEstPret = () => {
        setEstPret(true);
    };

    const handleProduitRefetch = () => {
        setTriggerProduitRefetch((prev) => !prev); // Change trigger state
    };

    const handleCritiqueRefetch = () => {
        setTriggerCritiqueRefetch((prev) => !prev); // Change trigger state
    };

    const handleBoutonProduit = () => {

        setIsShowingProduit(true);
        setIsShowingCritique(false);
        setIsShowingStatistique(false);
        setIsShowingForm(false);
    }

    const handleBoutonCritique = () => {
        setIsShowingProduit(false);
        setIsShowingCritique(true);
        setIsShowingStatistique(false);
        setIsShowingForm(false);
    }

    const handleBoutonStatistique = () => {
        setIsShowingProduit(false);
        setIsShowingCritique(false);
        setIsShowingStatistique(true);
        setIsShowingForm(false);
    }

    const handleBoutonAfficherForm = () => {
        setIsShowingForm(prev => !prev);
    }

    useEffect(() => {
        setIsShowingForm(produitEnModification)
    }, [produitEnModification]);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true)
            try {
                const data = await fetchAvailableProduitsAsync();
                setListeProduits(data);
            } catch (error) {
                setError({error: "error", message: error.message});
            } finally {
                setIsFetching(false);
            }
        }
        fetchData();

    }, [fetchAvailableProduitsAsync, triggerProduitRefetch]);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true)
            try {
                const data = await fetchAvailableCritiquesAsync();
                setListeCritiques(data);
            } catch (error) {
                setError({error: "error", message: error.message});
            } finally {
                setIsFetching(false);
            }
        }
        fetchData();

    }, [fetchAvailableCritiquesAsync, triggerCritiqueRefetch]);

    return (
        <>
            <GestionnaireProduits ref={gestionnaireProduitsRef}
                                  listeProduits={listeProduits}
                                  setListeProduits={setListeProduits}
                                  setListeCritiques={setListeCritiques}
                                  listeCritiques={listeCritiques}
                                  produitEnModification={produitEnModification}
                                  setProduitEnModification={setProduitEnModification}
                                  setValeurFormulaire={setValeurFormulaire}
                                  lorsquePret={gestionnaireEstPret}
                                  fonctionnaliteCritique={fonctionnaliteCritique}
                                  fonctionnaliteProduit={fonctionnaliteProduit}
                                  triggerProduitRefetch={handleProduitRefetch}
                                  triggerCritiqueRefetch={handleCritiqueRefetch}
                                  handleBoutonAfficherForm={handleBoutonAfficherForm}/>
            <GestionnaireCritiques ref={gestionnaireCritiquesRef}
                                   listeProduits={listeProduits}
                                   setListeCritiques={setListeCritiques}
                                   lorsquePret={gestionnaireEstPret}
                                   fonctionnaliteCritique={fonctionnaliteCritique}
                                   triggerCritiqueRefetch={handleCritiqueRefetch}
                                   handleBoutonAfficherForm={handleBoutonAfficherForm}/>
            <GestionnaireStatistiques ref={gestionnaireStatistiquesRef}
                                      listeProduits={listeProduits}
                                      listeCritiques={listeCritiques}
                                      lorsquePret={gestionnaireEstPret}
                                      fonctionnaliteStatistique={fonctionnaliteStatistique}/>

            <SectionTitres handleBoutonProduit={handleBoutonProduit}
                           handleBoutonCritique={handleBoutonCritique}
                           handleBoutonStatistique={handleBoutonStatistique}
                           handleBoutonAfficherForm={handleBoutonAfficherForm}
                           isShowingForm={isShowingForm}
                           isShowingStatistique={isShowingStatistique}
                           isShowingProduit={isShowingProduit}
                           isShowingCritique={isShowingCritique}
                           produitEnModification={produitEnModification}/>

            {isShowingProduit &&
            <GestionnaireReferenceProduitsContext.Provider value={gestionnaireProduitsRef}>
                <SectionProduit listeProduits={listeProduits} produitEnModification={produitEnModification} isShowingForm={isShowingForm}>
                    {isShowingForm &&
                    <FormulaireProduit valeurFormulaire={valeurFormulaire}
                                       produitEnModification={produitEnModification}/>
                    }
                </SectionProduit>
            </GestionnaireReferenceProduitsContext.Provider>
            }

            {isShowingCritique &&
            <GestionnaireReferenceCritiquesContext.Provider value={gestionnaireCritiquesRef}>
                <SectionCritiques listeCritiques={listeCritiques} listeProduits={listeProduits} isShowingForm={isShowingForm}>
                    {isShowingForm &&
                    <FormulaireCritique listeProduits={listeProduits}/>
                    }
                </SectionCritiques>
            </GestionnaireReferenceCritiquesContext.Provider>
            }

            {isShowingStatistique &&
            <GestionnaireReferenceStatistiquesContext.Provider value={gestionnaireStatistiquesRef}>
                <SectionStatistique listeProduits={listeProduits} listeCritiques={listeCritiques}>
                    <h2 className={style.soustitre}>Moyenne des notes par genre</h2>
                    <div className={style.divExterne}>
                        <div className={style.divMedian}>
                            <div className={style.divCategorie}>
                                {mapCategorieProduit.map(({genre, films}) => (
                                    <MoyenneCategorie
                                        key={genre}
                                        listeProduitGenre={films}
                                        titreGenre={genre}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionStatistique>

            </GestionnaireReferenceStatistiquesContext.Provider>
            }
        </>
    )
}

export default App
