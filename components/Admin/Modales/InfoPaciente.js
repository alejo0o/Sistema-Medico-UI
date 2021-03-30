import { Modal, Button, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
//Componentes
import { Boton } from '@/components/CommonStyles/CommonStyles';
import { StyledCol } from '@/components/CommonStyles/CommonStyles';
import Cell from '@/components/CommonStyles/TableCell';

const InfoPaciente = ({
  show,
  handleClose,
  paciente,
  getEdad,
  historia_clinica,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{`${paciente.nombres} ${paciente.apellidos}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Nombres' info={paciente.nombres} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Apellidos' info={paciente.apellidos} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Cedula' info={paciente.cedula} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell
                labelName='Fecha de Nacimiento'
                info={`${paciente.fechanacimiento}
              (${getEdad(paciente.fechanacimiento)} años)`}
              />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell
                labelName='Lugar de nacimiento'
                info={paciente.lugarnacimiento}
              />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Dirección' info={paciente.direccion} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Telefono' info={paciente.telefono} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Ocupación' info={paciente.ocupacion} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Numero de hijos' info={paciente.numero_hijos} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Género:' info={paciente.genero} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Tipo de Sangre' info={paciente.tipo_sangre} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell
                labelName='Nivel de Instrucción'
                info={paciente.nivel_de_instruccion}
              />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Estado Civil' info={paciente.estado_civil} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Etnia' info={paciente.etnia} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell
                labelName='Contaco de emergencia'
                info={paciente.contacto_emergencia_nombre}
              />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell
                labelName='Contacto emergencia (#num)'
                info={paciente.contacto_emergencia_telefono}
              />
            </StyledCol>
          </Row>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        {historia_clinica ? (
          <Link href={`/admin/paciente/historia/${paciente.paciente_id}`}>
            <Boton className='btn'>Historial Clínico</Boton>
          </Link>
        ) : (
          <Link href={`/admin/paciente/chistoria/${paciente.paciente_id}`}>
            <Boton className='btn'>Crear Historia Clínica</Boton>
          </Link>
        )}
        <Button variant='secondary' onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoPaciente;
