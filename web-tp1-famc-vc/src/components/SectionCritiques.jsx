import Critique from "./Critique.jsx";

/**
 * Composant SectionCritiques qui affiche une liste de critiques
 * ainsi que des éléments enfants.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.listeCritiques - Liste des critiques à afficher.
 * @param {React.ReactNode} props.children - Éléments enfants à afficher en dessous de la liste de critiques.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function SectionCritiques({listeCritiques, isShowingForm, children}) {

    return (
        <div className="sectionDiv">
            <div className="contenuSectionDiv">
                {!isShowingForm && listeCritiques.map((critique) => {
                    return <Critique key={critique.id} {...critique}/>
                })}
            </div>
            {children}
        </div>
    )
}