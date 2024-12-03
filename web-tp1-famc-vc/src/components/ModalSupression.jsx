import { Modal, Button } from "react-bootstrap";

const ModalSupression = ({ show, handleClose, onConfirm, bodyTexte }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bodyTexte}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSupression;
