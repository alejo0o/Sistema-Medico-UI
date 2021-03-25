import { Modal, Button, Col, Row } from 'react-bootstrap';
import { Boton } from '../../CommonStyles/CommonStyles';
import { StyledCol, StyledRow } from '../../CommonStyles/CommonStyles';
import Cell from '../../CommonStyles/TableCell';
import Link from 'next/link';

const InfoPaciente = ({ show, handleClose, paciente, getEdad }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{`${paciente.nombres} ${paciente.apellidos}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Col style={{ border: 'solid 2px #055c9d', borderRadius: '10px' }}>
          <StyledRow>
            <StyledCol>
              <Cell labelName='Nombres' info={paciente.nombres} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Apellidos' info={paciente.apellidos} />
            </StyledCol>
            <Col>
              <Cell labelName='Cedula' info={paciente.cedula} />
            </Col>
          </StyledRow>
          <StyledRow>
            <StyledCol>
              <Cell
                labelName='Fecha de Nacimiento'
                info={`${paciente.fechanacimiento}
              (${getEdad(paciente.fechanacimiento)} años)`}
              />
            </StyledCol>
            <StyledCol>
              <Cell
                labelName='Lugar de nacimiento'
                info={paciente.lugarnacimiento}
              />
            </StyledCol>
            <Col>
              <Cell labelName='Dirección' info={paciente.direccion} />
            </Col>
          </StyledRow>
          <StyledRow>
            <StyledCol>
              <Cell labelName='Telefono' info={paciente.telefono} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Ocupación' info={paciente.ocupacion} />
            </StyledCol>

            <Col>
              <Cell labelName='Numero de hijos' info={paciente.numero_hijos} />
            </Col>
          </StyledRow>
          <StyledRow>
            <StyledCol>
              <Cell labelName='Tipo de Sangre' info={paciente.tipo_sangre} />
            </StyledCol>
            <StyledCol>
              <Cell
                labelName='Nivel de Instrucción'
                info={paciente.nivel_de_instruccion}
              />
            </StyledCol>
            <Col>
              <Cell labelName='Estado Civil' info={paciente.estado_civil} />
            </Col>
          </StyledRow>
          <Row>
            <StyledCol>
              <Cell labelName='Etnia' info={paciente.etnia} />
            </StyledCol>
            <StyledCol>
              <Cell
                labelName='Contaco de emergencia'
                info={paciente.contacto_emergencia_nombre}
              />
            </StyledCol>
            <Col>
              <Cell
                labelName='Contacto emergencia (#num)'
                info={paciente.contacto_emergencia_telefono}
              />
            </Col>
          </Row>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        <Link href={`/admin/paciente/historia/${paciente.paciente_id}`}>
          <Boton className='btn '>Historial Clínico</Boton>
        </Link>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoPaciente;
