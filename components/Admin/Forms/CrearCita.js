import { Form, Col, ListGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import styled from 'styled-components';
import { Boton, Boton_A } from '@/components/CommonStyles/CommonStyles';

const StyledListItem = styled(ListGroup.Item)`
  cursor: pointer;
  &:hover {
    background: #fbf6f3;
  }
`;

const NuevaCita = ({
  handleSubmit,
  handleChange,
  handleSearchPaciente,
  pacientesQuery,
  medicosQuery,
  handleChangePacientesQuery,
  handleChangeMedicosQuery,
  pacientesResults,
  medicosResults,
  handleSearchMedicos,
  handleClickPaciente,
  handleClickMedico,
}) => {
  const [pacienteSelect, setpacienteSelect] = useState('');
  const [medicoSelect, setmedicoSelect] = useState('');
  return (
    <div className='p-4'>
      <h1>Nueva Cita</h1>

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
          <Form.Label>Buscar Medico:</Form.Label>
          <div className='d-flex'>
            <Form.Control
              name='buscar_medico'
              type='text'
              placeholder='cédula o nombres'
              value={medicosQuery}
              onChange={handleChangeMedicosQuery}
            />
            <Boton onClick={handleSearchMedicos}>
              <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
            </Boton>
          </div>

          <ListGroup variant='flush'>
            {medicosResults.length > 0 ? (
              medicosResults.map((medico) => (
                <StyledListItem
                  key={medico.medico_id}
                  onClick={() => {
                    handleClickMedico(medico);
                    setmedicoSelect(
                      `${medico.nombres
                        .toString()
                        .trim()} ${medico.apellidos.toString().trim()}`
                    );
                  }}>
                  {`${medico.nombres} ${medico.apellidos}`}
                </StyledListItem>
              ))
            ) : (
              <ListGroup.Item>No hay resultados</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <Form.Label>Paciente:</Form.Label>

          <Form.Control
            name='buscar_paciente'
            type='text'
            placeholder='cédula o nombres'
            disabled
            value={pacienteSelect}
          />
        </Col>
        <Col sm='6'>
          <Form.Label>Medico:</Form.Label>
          <Form.Control
            name='buscar_medico'
            type='text'
            disabled
            placeholder='cédula o nombres'
            value={medicoSelect}
          />
        </Col>
      </Row>
      {/*------Formulario para la crecion de la cita---- */}

      <Form onChange={handleChange} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} sm='6'>
            <Form.Label>Fecha:</Form.Label>
            <Form.Control name='fecha' type='date' required />
          </Form.Group>
          <Form.Group as={Col} sm='6'>
            <Form.Label>Hora:</Form.Label>
            <Form.Control name='hora' type='time' required />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm='6'>
            <Form.Label>Motivo de la Cita (opcional):</Form.Label>
            <Form.Control name='motivo_cita' as='textarea' />
          </Form.Group>
        </Row>
        <Boton_A
          className='d-block'
          type='submit'
          size='lg'
          style={{ margin: '0 auto' }}>
          Crear Cita
        </Boton_A>
      </Form>
    </div>
  );
};

export default NuevaCita;
