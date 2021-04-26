import { Modal, Col, Row, Dropdown } from 'react-bootstrap';
import { Boton, StyledCol } from '@/components/CommonStyles/CommonStyles';
import Cell from '@/components/CommonStyles/TableCell';
import TextCell from '@/components/CommonStyles/TextCell';
import { LinearProgress } from '@material-ui/core';

const NuevaCita = ({
  show,
  handleClose,
  cita,
  handleSendEmailPaciente,
  handleSendEmailMedico,
  loading,
  handleSendSMSPaciente,
  handleSendSMSMedico,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <LinearProgress />}
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
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            Recordatorio de la Cita (Mail)
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSendEmailPaciente}>
              Recordatorio a paciente
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSendEmailMedico}>
              Recordatorio a médico
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant='info' id='dropdown-basic'>
            Recordatorio de la Cita (SMS)
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSendSMSPaciente}>
              Recordatorio a paciente
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSendSMSMedico}>
              Recordatorio a médico
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Boton color='gray' onClick={handleClose}>
          Close
        </Boton>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevaCita;
