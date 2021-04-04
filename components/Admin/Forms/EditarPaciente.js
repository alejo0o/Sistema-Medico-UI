import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';

const EditarPaciente = ({
  etnias,
  niveles_instruccion,
  tipos_sangre,
  estados_civiles,
  generos,
  handleSubmit,
  handleChange,
  paciente,
}) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Paciente</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Cedula:</Form.Label>
            <Form.Control
              name='cedula'
              type='text'
              onChange={handleChange}
              value={paciente.cedula}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Nombres:</Form.Label>
            <Form.Control
              name='nombres'
              type='text'
              onChange={handleChange}
              value={paciente.nombres}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control
              name='apellidos'
              type='text'
              onChange={handleChange}
              value={paciente.apellidos}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Fecha de Nacimiento:</Form.Label>
            <Form.Control
              name='fechanacimiento'
              type='date'
              onChange={handleChange}
              value={paciente.fechanacimiento}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Lugar de Nacimiento:</Form.Label>
            <Form.Control
              name='lugarnacimiento'
              type='text'
              onChange={handleChange}
              value={paciente.lugarnacimiento}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              name='direccion'
              type='text'
              onChange={handleChange}
              value={paciente.direccion}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              name='telefono'
              type='text'
              onChange={handleChange}
              value={paciente.telefono}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Ocupación:</Form.Label>
            <Form.Control
              name='ocupacion'
              type='text'
              onChange={handleChange}
              value={paciente.ocupacion}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Numero de hijos:</Form.Label>
            <Form.Control
              name='numero_hijos'
              type='text'
              onChange={handleChange}
              value={paciente.numero_hijos}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Género:</Form.Label>
            <Form.Control
              name='genero_id'
              as='select'
              onChange={handleChange}
              value={paciente.genero_id}
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
              value={paciente.tipo_de_sangre_id}
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
              value={paciente.estado_civil_id}
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
              value={paciente.nivel_de_instruccion_id}
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
              value={paciente.etnia_id}
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
            <Form.Label>Contacto de emergencia (nombre):</Form.Label>
            <Form.Control
              name='contacto_emergencia_nombre'
              type='text'
              value={paciente.contacto_emergencia_nombre ?? ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Contacto de emergencia (teléfono):</Form.Label>
            <Form.Control
              name='contacto_emergencia_telefono'
              type='text'
              value={paciente.contacto_emergencia_telefono}
              onChange={handleChange}
            />
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
    </div>
  );
};

export default EditarPaciente;
