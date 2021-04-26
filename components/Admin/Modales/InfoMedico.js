import { Modal, Col, Row, ListGroup } from 'react-bootstrap';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import { StyledCol } from '@/components/CommonStyles/CommonStyles';
import Cell from '@/components/CommonStyles/TableCell';
import TextCell from '@/components/CommonStyles/TextCell';

const InfoMedico = ({ show, handleClose, medico }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{`${medico.nombres} ${medico.apellidos}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Nombres' info={medico.nombres} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Apellidos' info={medico.apellidos} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Cedula' info={medico.cedula} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Teléfono' info={medico.telefono} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Correo' info={medico.email} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='6'>
              <label>
                <strong>Especialidades:</strong>
              </label>
              <ListGroup className='mb-2'>
                {medico.especialidades.map((especialidad) => (
                  <ListGroup.Item variant='info' key={especialidad.id}>
                    {especialidad.especialidad}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </StyledCol>
          </Row>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        <Boton color='gray' onClick={handleClose}>
          Cerrar
        </Boton>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoMedico;
