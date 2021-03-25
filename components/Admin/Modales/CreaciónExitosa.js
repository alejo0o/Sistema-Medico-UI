import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'next/router';

const CreaciónExitosa = ({ show, handleClose, router }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>Creación Exitosa</Modal.Title>
      </Modal.Header>
      <Modal.Body>El paciente se ha creado satisfactoriamente!</Modal.Body>
      <Modal.Footer>
        <Button
          variant='success'
          onClick={() => {
            router.push('/admin/pacientes');
          }}>
          Ok! <i className='fas fa-check-circle' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(CreaciónExitosa);
