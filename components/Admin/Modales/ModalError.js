import { Modal, Button } from 'react-bootstrap';

const ModalError = ({ show, handleClose, tituloMensaje, mensaje }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>{tituloMensaje}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          Ok! <i className='fas fa-exclamation-triangle' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
