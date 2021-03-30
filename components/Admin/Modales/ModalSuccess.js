import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'next/router';

const ModalSuccess = ({
  show,
  handleClose,
  router,
  tituloMensaje,
  mensaje,
  redireccion,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>{tituloMensaje}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button
          variant='success'
          onClick={() => {
            router.push(redireccion);
          }}>
          Ok! <i className='fas fa-check-circle' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(ModalSuccess);
