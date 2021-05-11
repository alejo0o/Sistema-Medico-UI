import { Form, Col, ListGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import styled from 'styled-components';
import { Boton, Boton_A } from '@/components/CommonStyles/CommonStyles';
import { objeto_horas } from '@/components/utils/utils';

const StyledListItem = styled(ListGroup.Item)`
  cursor: pointer;
  &:hover {
    background: #fbf6f3;
  }
`;

const EditarCita = ({
  cita,
  handleSubmit,
  handleChange,
  handleSearchPaciente,
  pacientesQuery,

  handleChangePacientesQuery,
  medicos,
  pacientesResults,
  handleSearchPacienteKey,
  handleClickPaciente,
}) => {
  const [pacienteSelect, setpacienteSelect] = useState('');

  return (
    <div className='p-4'>
      <h1>Editar Cita</h1>

      {/*------Campo encargado de la busqueda del paciente---- */}
      <Row>
        <Col sm='6'>
          <Form.Label>Buscar Paciente:</Form.Label>
          <div className='d-flex'>
            <Form.Control
              name='buscar_paciente'
              type='text'
              placeholder='cédula o nombres'
              value={pacientesQuery}
              onChange={handleChangePacientesQuery}
              onKeyDown={handleSearchPacienteKey}
            />
            <Boton onClick={handleSearchPaciente}>
              <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
            </Boton>
          </div>

          <ListGroup variant='flush'>
            {pacientesResults.length > 0 ? (
              pacientesResults.map((paciente) => (
                <StyledListItem
                  key={paciente.paciente_id}
                  onClick={() => {
                    handleClickPaciente(paciente);
                    setpacienteSelect(
                      `${paciente.nombres
                        .toString()
                        .trim()} ${paciente.apellidos.toString().trim()}`
                    );
                  }}>
                  {`${paciente.nombres} ${paciente.apellidos}`}
                </StyledListItem>
              ))
            ) : (
              <ListGroup.Item>No hay resultados</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col sm='6'>
          <Form.Label>Paciente:</Form.Label>

          <Form.Control
            name='buscar_paciente'
            type='text'
            disabled
            value={
              pacienteSelect.trim()
                ? pacienteSelect
                : `${cita.paciente_nombres
                    .toString()
                    .trim()} ${cita.paciente_apellidos.toString().trim()}`
            }
          />
        </Col>
      </Row>

      {/*------Formulario para la crecion de la cita---- */}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} sm='6'>
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              name='fecha'
              type='date'
              onChange={handleChange}
              value={cita.fecha.split(' ')[0]}
              required
            />
          </Form.Group>
          <Form.Group as={Col} sm='6' controlId='medico-select'>
            <Form.Label>Médico:</Form.Label>
            <Form.Control
              as='select'
              name='medico_id'
              onChange={handleChange}
              value={cita.medico_id}
              custom>
              {medicos.map((medico) => (
                <option
                  key={medico.medico_id}
                  value={
                    medico.medico_id
                  }>{`Dr./Dra. ${medico.nombres
                  .toString()
                  .trim()} ${medico.apellidos.toString().trim()}`}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm='6' controlId='hora'>
            <Form.Label>Hora:</Form.Label>
            <Form.Control
              as='select'
              value={cita.hora}
              onChange={handleChange}
              name='hora'
              custom>
              {Object.keys(objeto_horas).map((llave, i) => (
                <option key={i} value={llave}>
                  {objeto_horas[llave]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} sm='6'>
            <Form.Label>Motivo de la Cita (opcional):</Form.Label>
            <Form.Control
              name='motivo_cita'
              onChange={handleChange}
              value={cita.motivo_cita ?? ''}
              as='textarea'
            />
          </Form.Group>
        </Row>
        <Boton_A
          className='d-block'
          type='submit'
          size='lg'
          style={{ margin: '0 auto' }}>
          Editar Cita
        </Boton_A>
      </Form>
    </div>
  );
};

export default EditarCita;
