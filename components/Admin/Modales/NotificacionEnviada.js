import { Modal, Button } from 'react-bootstrap';

const CorreoEnviado = ({ show, handleClose, tituloMensaje, mensaje }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tituloMensaje}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={handleClose}>
          Ok! <i className='fas fa-check-circle' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CorreoEnviado;
