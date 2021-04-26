import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  apellidos: yup.string().required(),
  cedula: yup.number().required(),
  contacto_emergencia_nombre: yup.string(),
  contacto_emergencia_telefono: yup.number().positive().integer(),
  direccion: yup.string().required(),
  lugarnacimiento: yup.string().required(),
  nombres: yup.string().required(),
  numero_hijos: yup.number().required().integer(),
  ocupacion: yup.string().required(),
  telefono: yup.number().required().positive().integer(),
  email: yup.string().email(),
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
const validateTelefonoOpcional = (value) => {
  let error;
  if (value) {
    if (!/^09[8|9]{1}[0-9]{7}$/i.test(value))
      error = 'Formato incorrecto (ej: 0991234567)';
  }
  return error;
};

const EditarPaciente = ({
  etnias,
  niveles_instruccion,
  tipos_sangre,
  estados_civiles,
  generos,
  handleSubmit,
  paciente,
}) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Paciente</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={paciente}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Cedula:</Form.Label>
                <Form.Control
                  name='cedula'
                  type='text'
                  onChange={handleChange}
                  value={values.cedula}
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
                  onChange={handleChange}
                  value={values.nombres}
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
                  onChange={handleChange}
                  value={values.apellidos}
                  isInvalid={errors.apellidos}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Fecha de Nacimiento:</Form.Label>
                <Form.Control
                  name='fechanacimiento'
                  type='date'
                  onChange={handleChange}
                  value={values.fechanacimiento}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Lugar de Nacimiento:</Form.Label>
                <Form.Control
                  name='lugarnacimiento'
                  type='text'
                  onChange={handleChange}
                  value={values.lugarnacimiento}
                  isInvalid={errors.lugarnacimiento}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Dirección:</Form.Label>
                <Form.Control
                  name='direccion'
                  type='text'
                  onChange={handleChange}
                  value={values.direccion}
                  isInvalid={errors.direccion}
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
                  onChange={handleChange}
                  value={values.telefono}
                  isInvalid={
                    validateTelefonoEC(values.telefono) || errors.telefono
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {validateTelefonoEC(values.telefono)}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Ocupación:</Form.Label>
                <Form.Control
                  name='ocupacion'
                  type='text'
                  onChange={handleChange}
                  value={values.ocupacion}
                  isInvalid={errors.ocupacion}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Numero de hijos:</Form.Label>
                <Form.Control
                  name='numero_hijos'
                  type='text'
                  onChange={handleChange}
                  value={values.numero_hijos}
                  isInvalid={errors.numero_hijos}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo numérico requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Género:</Form.Label>
                <Form.Control
                  name='genero_id'
                  as='select'
                  onChange={handleChange}
                  value={values.genero_id}
                  required
                  custom>
                  {generos.map((genero) => (
                    <option key={genero.genero_id} value={genero.genero_id}>
                      {genero.genero}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Tipo de Sangre:</Form.Label>
                <Form.Control
                  name='tipo_de_sangre_id'
                  as='select'
                  onChange={handleChange}
                  value={values.tipo_de_sangre_id}
                  required
                  custom>
                  {tipos_sangre.map((tipo) => (
                    <option
                      key={tipo.tipo_de_sangre_id}
                      value={tipo.tipo_de_sangre_id}>
                      {tipo.tipo_sangre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Estado Civil:</Form.Label>
                <Form.Control
                  name='estado_civil_id'
                  as='select'
                  onChange={handleChange}
                  value={values.estado_civil_id}
                  required
                  custom>
                  {estados_civiles.map((estado) => (
                    <option
                      key={estado.estado_civil_id}
                      value={estado.estado_civil_id}>
                      {estado.estado_civil}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Educación:</Form.Label>
                <Form.Control
                  name='nivel_de_instruccion_id'
                  as='select'
                  onChange={handleChange}
                  value={values.nivel_de_instruccion_id}
                  required
                  custom>
                  {niveles_instruccion.map((educacion) => (
                    <option
                      key={educacion.nivel_de_instruccion_id}
                      value={educacion.nivel_de_instruccion_id}>
                      {educacion.nivel_de_instruccion}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Etnia:</Form.Label>
                <Form.Control
                  name='etnia_id'
                  as='select'
                  onChange={handleChange}
                  value={values.etnia_id}
                  required
                  custom>
                  {etnias.map((etnia) => (
                    <option key={etnia.etnia_id} value={etnia.etnia_id}>
                      {etnia.etnia}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Correo electrónico(opcional):</Form.Label>
                <Form.Control
                  name='email'
                  type='text'
                  placeholder='correo'
                  onChange={handleChange}
                  value={values.email ?? ''}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  Correo requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Contacto de emergencia (nombre):</Form.Label>
                <Form.Control
                  name='contacto_emergencia_nombre'
                  type='text'
                  value={values.contacto_emergencia_nombre ?? ''}
                  onChange={handleChange}
                  isValid={!errors.contacto_emergencia_nombre}
                />
                <Form.Control.Feedback type='valid'>
                  Campo opcional
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Contacto de emergencia (teléfono):</Form.Label>
                <Form.Control
                  name='contacto_emergencia_telefono'
                  type='text'
                  value={values.contacto_emergencia_telefono}
                  onChange={handleChange}
                  isInvalid={
                    validateTelefonoOpcional(
                      values.contacto_emergencia_telefono
                    ) || errors.contacto_emergencia_telefono
                  }
                  isValid={
                    !validateTelefonoOpcional(
                      values.contacto_emergencia_telefono
                    )
                  }
                />
                <Form.Control.Feedback type='valid'>
                  Campo opcional
                </Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  {validateTelefonoOpcional(
                    values.contacto_emergencia_telefono
                  )}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Boton_A
              className='d-block'
              type='submit'
              size='lg'
              style={{ margin: '0 auto' }}>
              Editar Paciente
            </Boton_A>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditarPaciente;
