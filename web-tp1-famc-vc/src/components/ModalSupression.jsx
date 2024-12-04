import { Modal, Button } from "react-bootstrap";
import style from '../style/Modal.module.css';

/**
 * La fenêtre popup de confirmation de suppression
 * @param show - Si afficher ou non
 * @param handleClose - Fonction permettant de fermer le modal
 * @param onConfirm - Fonction lors de la confirmation du modal
 * @param bodyTexte - Texte afficher dans le body du modal
 * @returns {JSX.Element}
 * @constructor
 */
const ModalSupression = ({ show, handleClose, onConfirm, bodyTexte }) => {
    return (
        <Modal show={show} onHide={handleClose} dialogClassName={style.modalContent}>
            <Modal.Header className={style.modalBg}>
                <Modal.Title className={style.modalTitle}>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modalBg}>
                {bodyTexte}
            </Modal.Body>
            <Modal.Footer className={style.modalBg}>
                <Button onClick={handleClose} className={style.annulerButton}>
                    Annuler
                </Button>
                <Button onClick={onConfirm} className={style.supprimerButton}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSupression;
