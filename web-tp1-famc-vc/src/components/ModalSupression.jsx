import { Modal, Button } from "react-bootstrap";
import style from '../style/Modal.module.css';

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
