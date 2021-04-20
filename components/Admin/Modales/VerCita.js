import { Modal, Col, Row } from 'react-bootstrap';
import { Boton, StyledCol } from '@/components/CommonStyles/CommonStyles';
import Cell from '@/components/CommonStyles/TableCell';
import TextCell from '@/components/CommonStyles/TextCell';

const NuevaCita = ({ show, handleClose, cita }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <StyledCol sm='6'>
            <Cell
              labelName='Paciente'
              info={`${cita.paciente_nombres
                .toString()
                .trim()} ${cita.paciente_apellidos.toString().trim()}`}
            />
          </StyledCol>
          <StyledCol sm='6'>
            <Cell
              labelName='Medico'
              info={`${cita.medico_nombres
                .toString()
                .trim()} ${cita.medico_apellidos.toString().trim()}`}
            />
          </StyledCol>
        </Row>
        <Row>
          <StyledCol sm='6'>
            <Cell labelName='Fecha' info={cita.fecha.split(' ')[0]} />
          </StyledCol>
          <StyledCol sm='6'>
            <Cell labelName='Hora' info={cita.hora} />
          </StyledCol>
        </Row>
        <Row>
          <StyledCol sm='6'>
            <TextCell
              labelName='Motivo de la consulta'
              info={cita.motivo_cita}
            />
          </StyledCol>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Boton color='gray' onClick={handleClose}>
          Close
        </Boton>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevaCita;
