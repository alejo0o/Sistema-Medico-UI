import { Modal, Button } from 'react-bootstrap';

const ErrorCreacion = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>Revise que los datos ingresados sean correctos!</Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          Ok! <i className='fas fa-exclamation-triangle' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorCreacion;
