import { Modal, Col, Row, ListGroup } from 'react-bootstrap';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import { StyledCol } from '@/components/CommonStyles/CommonStyles';
import Cell from '@/components/CommonStyles/TableCell';
import TextCell from '@/components/CommonStyles/TextCell';

const InfoEvolucion = ({ show, handleClose, paciente, evolucion }) => {
  const enfermedades = evolucion.diagnostico
    ? JSON.parse(evolucion.diagnostico)
    : [];
  /*{Object.keys(enfermedades).map((key) => (
                  <ListGroup.Item variant='info' key={key}>
                    {`${key}: ${enfermedades[key]}`}
                  </ListGroup.Item>
                ))} */
  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{`${paciente.nombres} ${paciente.apellidos}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Fecha Consulta' info={evolucion.fecha} />
            </StyledCol>
            <StyledCol sm='4'>
              <TextCell
                labelName='Motivo consulta'
                info={evolucion.motivo_consulta}
              />
            </StyledCol>
            <StyledCol sm='4'>
              <TextCell
                labelName='Procedimiento'
                info={evolucion.procedimiento}
              />
            </StyledCol>
          </Row>

          <Row>
            <StyledCol sm='4'>
              <label>
                <strong>Diagnóstico:</strong>
              </label>
              <ListGroup className='mb-2'>
                {enfermedades.map((enfermedad) => (
                  <ListGroup.Item variant='info' key={enfermedad.codigo}>
                    {`${enfermedad.codigo}: ${enfermedad.descripcion}`}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </StyledCol>
            <StyledCol sm='4'>
              <TextCell labelName='Tratamiento' info={evolucion.tratamiento} />
            </StyledCol>
            {paciente.genero_id != 1 ? (
              <StyledCol sm='4'>
                <Cell
                  labelName='Fecha Ultima Menstruación'
                  info={evolucion.fecha_ultima_menstruacion}
                />
              </StyledCol>
            ) : (
              <StyledCol sm='4'>
                <Cell
                  labelName='Proximo Control'
                  info={evolucion.proximo_control}
                />
              </StyledCol>
            )}
          </Row>
          <Row>
            {paciente.genero_id != 1 ? (
              <StyledCol sm='4'>
                <Cell
                  labelName='Proximo Control'
                  info={evolucion.proximo_control}
                />
              </StyledCol>
            ) : (
              <></>
            )}
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

export default InfoEvolucion;
/* 
<ListGroup.Item key={enfermedad.subcategoria_id ?? 1}>
                    {enfermedad.subcategoria_descripcion}
                  </ListGroup.Item>
                   */
