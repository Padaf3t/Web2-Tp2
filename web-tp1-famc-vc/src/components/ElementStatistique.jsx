import styles from "../style/Statistique.module.css";

/**
 * Composant ElementStatistique qui affiche des informations statistiques
 * sur un film, y compris son nom, une image et sa note moyenne.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.nom - Le nom du film.
 * @param {string} props.afficheSrc - L'URL de l'image d'affiche du film.
 * @param {number} props.moyenne - La note moyenne du film.
 * @returns {JSX.Element} Le rendu du composant.
 */
export default function ElementStatistique({nom, afficheSrc, moyenne}) {

    return (
        <div className={["elementDiv", styles.statDiv].join(" ")}>
            <img src={afficheSrc} width="100px" alt="Image du film"/>
            <div>
                <p>{nom}</p>
                <div className={styles.noteMoyenne}>{moyenne}%</div>
            </div>
        </div>
    )
}