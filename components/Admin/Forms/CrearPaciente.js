import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  apellidos: yup.string().required(),
  cedula: yup
    .string()
    .matches(/^[0-9]{10}$/i, 'Es un campo numerico de 10 digitos')
    .required('Campo requerido'),
  contacto_emergencia_nombre: yup.string().optional(),
  contacto_emergencia_telefono: yup
    .string()
    .matches(/^09[8|9]{1}[0-9]{7}$/i, 'Formato incorrecto (ej: 0991234567)')
    .optional(),
  direccion: yup.string().required(),
  lugarnacimiento: yup.string().required(),
  nombres: yup.string().required(),
  numero_hijos: yup.number().required().integer(),
  ocupacion: yup.string().required(),
  telefono: yup
    .string()
    .matches(/^09[8|9]{1}[0-9]{7}$/i, 'Formato incorrecto (ej: 0991234567)')
    .required('Teléfono requerido'),
  email: yup.string().email('Correo inválido').optional(),
});

const CrearPaciente = ({
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
      <h4 className='mb-3'>Nuevo Paciente</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={paciente}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Cedula:</Form.Label>
                <Form.Control
                  name='cedula'
                  type='text'
                  placeholder='Cedula'
                  isInvalid={errors.cedula}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.cedula}
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
                <Form.Label>Fecha de Nacimiento:</Form.Label>
                <Form.Control name='fechanacimiento' type='date' required />
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Lugar de Nacimiento:</Form.Label>
                <Form.Control
                  name='lugarnacimiento'
                  type='text'
                  isInvalid={errors.lugarnacimiento}
                  placeholder='Lugar Nacimiento'
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
                  isInvalid={errors.direccion}
                  placeholder='Dirección'
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
                  isInvalid={errors.telefono}
                  placeholder='0991234567'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.telefono}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Ocupación:</Form.Label>
                <Form.Control
                  name='ocupacion'
                  type='text'
                  isInvalid={errors.ocupacion}
                  placeholder='Oficio'
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
                  isInvalid={errors.numero_hijos}
                  placeholder='# de hijos'
                />
                <Form.Control.Feedback type='invalid'>
                  Campo numérico requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Género:</Form.Label>
                <Form.Control name='genero_id' as='select' required custom>
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
                <Form.Control name='etnia_id' as='select' required custom>
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
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Contacto de emergencia (nombre):</Form.Label>
                <Form.Control
                  name='contacto_emergencia_nombre'
                  type='text'
                  placeholder='Nombre'
                  isInvalid={errors.contacto_emergencia_nombre}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.contacto_emergencia_nombre}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm='4' sm='4'>
                <Form.Label>Contacto de emergencia (teléfono):</Form.Label>
                <Form.Control
                  name='contacto_emergencia_telefono'
                  type='text'
                  isInvalid={errors.contacto_emergencia_telefono}
                  placeholder='Teléfono'
                />

                <Form.Control.Feedback type='invalid'>
                  {errors.contacto_emergencia_telefono}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Boton_A
              className='d-block'
              type='submit'
              size='lg'
              style={{ margin: '0 auto' }}>
              Crear Paciente
            </Boton_A>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearPaciente;
