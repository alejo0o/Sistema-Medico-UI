import { Modal, Button, Col, Row } from 'react-bootstrap';
import { Boton } from '../../CommonStyles/CommonStyles';
import { StyledCol, StyledRow } from '../../CommonStyles/CommonStyles';
import Cell from '../../CommonStyles/TableCell';
import TextCell from '../../CommonStyles/TextCell';
import Link from 'next/link';

const InfoEvolucion = ({
  show,
  handleClose,
  paciente,
  evolucion,
  enfermedades,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{`${paciente.nombres} ${paciente.apellidos}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Col style={{ border: 'solid 2px #055c9d', borderRadius: '10px' }}>
          <StyledRow>
            <StyledCol>
              <Cell labelName='Fecha Consulta' info={evolucion.fecha} />
            </StyledCol>
            <StyledCol>
              <TextCell
                labelName='Motivo consulta'
                info={evolucion.motivo_consulta}
              />
            </StyledCol>
            <Col>
              <TextCell
                labelName='Procedimiento'
                info={evolucion.procedimiento}
              />
            </Col>
          </StyledRow>
          <Row>
            <StyledCol>
              <TextCell
                labelName='Diagnostico'
                info={enfermedades.map(
                  (enfermedad) => enfermedad.subcategoria_descripcion
                )}
              />
            </StyledCol>
            <StyledCol>
              <TextCell labelName='Tratamiento' info={evolucion.tratamiento} />
            </StyledCol>
            <Col>
              <Cell
                labelName='Proximo Control'
                info={evolucion.proximo_control}
              />
            </Col>
          </Row>
        </Col>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoEvolucion;
