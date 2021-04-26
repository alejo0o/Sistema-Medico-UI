import { Form, Col, Row, ListGroup } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useMediaQuery, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import { Boton } from '@/components/CommonStyles/CommonStyles';

const StyledListItem = styled(ListGroup.Item)`
  cursor: pointer;
  &:hover {
    background: #fbf6f3;
  }
`;
const StyledIcon = styled.i`
  font-size: 2em;
  margin: auto 0;
  cursor: pointer;
  &:hover {
    color: #e43d40;
  }
`;

const schema = yup.object().shape({
  apellidos: yup.string().required(),
  cedula: yup.number().required(),
  nombres: yup.string().required(),
  telefono: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
});

const validatecedula = (value) => {
  let error;
  if (!value) error = 'La cédula es requerida';
  else if (!/^[0-9]{10}$/i.test(value))
    error = 'Es un campo numerico de 10 digitos';
  return error;
};
const validateTelefonoEC = (value) => {
  let error;
  if (!value) error = 'Telefono requerido';
  else if (!/^09[8|9]{1}[0-9]{7}$/i.test(value))
    error = 'Formato incorrecto (ej: 0991234567)';
  return error;
};

const CrearMedico = ({
  handleSubmit,
  medico,
  especialidaesQuery,
  especialidadesResults,
  handleChangeEspecialidadesQuery,
  handleClickEspecialidad,
  handleSearchEspecialidadesKey,
  handleSearchEspecialidades,
  especialidades,
  handleRemoveEspecialidad,
}) => {
  const matches = useMediaQuery('(max-width:1024px)');

  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nuevo Médico</h4>

      {/*------Campo encargado de la busqueda de especialidades---- */}
      <Row>
        <Col sm='6'>
          <Form.Label>Buscar Especialidades:</Form.Label>
          <div className='d-flex'>
            <Form.Control
              name='buscar_especialidades'
              type='text'
              placeholder='especialidad'
              value={especialidaesQuery}
              onChange={handleChangeEspecialidadesQuery}
              onKeyDown={handleSearchEspecialidadesKey}
            />
            <Boton onClick={handleSearchEspecialidades}>
              <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
            </Boton>
          </div>

          <ListGroup variant='flush'>
            {especialidadesResults.length > 0 ? (
              especialidadesResults.map((especialidad) => (
                <StyledListItem
                  key={especialidad.especialidad_id}
                  onClick={() => {
                    handleClickEspecialidad(especialidad);
                  }}>
                  {`${especialidad.especialidad}`}
                </StyledListItem>
              ))
            ) : (
              <ListGroup.Item>No hay resultados</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col sm={matches ? '' : '4'}>
          <Form.Label>Especialidades:</Form.Label>
          <div>
            <ListGroup>
              {especialidades.length != 0 ? (
                especialidades.map((especialidad) => (
                  <ListGroup.Item
                    variant='info'
                    key={especialidad.especialidad_id}
                    className='d-flex'>
                    <ListItemText primary={`${especialidad.especialidad}`} />
                    <StyledIcon
                      className='far fa-times-circle'
                      onClick={() => {
                        handleRemoveEspecialidad(especialidad);
                      }}
                    />
                  </ListGroup.Item>
                ))
              ) : (
                <div className='p-3'>Vacio</div>
              )}
            </ListGroup>
          </div>
        </Col>
      </Row>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={medico}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Cedula:</Form.Label>
                <Form.Control
                  name='cedula'
                  type='text'
                  placeholder='Cedula'
                  isInvalid={validatecedula(values.cedula)}
                />
                <Form.Control.Feedback type='invalid'>
                  {validatecedula(values.cedula)}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombres:</Form.Label>
                <Form.Control
                  name='nombres'
                  type='text'
                  placeholder='Nombres'
                  isInvalid={errors.nombres}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control
                  name='apellidos'
                  type='text'
                  placeholder='Apellidos'
                  isInvalid={errors.apellidos}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control
                  name='telefono'
                  type='text'
                  isInvalid={
                    validateTelefonoEC(values.telefono) || errors.telefono
                  }
                  placeholder='0991234567'
                />
                <Form.Control.Feedback type='invalid'>
                  {validateTelefonoEC(values.telefono)}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control
                  name='email'
                  type='text'
                  placeholder='correo'
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  Correo Invalido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Boton_A
              className='d-block'
              type='submit'
              size='lg'
              style={{ margin: '0 auto' }}>
              Crear Médico
            </Boton_A>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearMedico;
