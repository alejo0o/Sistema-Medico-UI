import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';

const CrearPaciente = ({
  etnias,
  niveles_instruccion,
  tipos_sangre,
  estados_civiles,
  generos,
  handleSubmit,
  handleaChange,
}) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nuevo Paciente</h4>
      <Form onSubmit={handleSubmit} onChange={handleaChange}>
        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Cedula:</Form.Label>
            <Form.Control
              name='cedula'
              type='text'
              placeholder='Cedula'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Nombres:</Form.Label>
            <Form.Control
              name='nombres'
              type='text'
              placeholder='Nombres'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control
              name='apellidos'
              type='text'
              placeholder='Apellidos'
              required
            />
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
              placeholder='Lugar Nacimiento'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              name='direccion'
              type='text'
              placeholder='Dirección'
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
              placeholder='Número'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Ocupación:</Form.Label>
            <Form.Control
              name='ocupacion'
              type='text'
              placeholder='Oficio'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Numero de hijos:</Form.Label>
            <Form.Control
              name='numero_hijos'
              type='text'
              placeholder='# de hijos'
              required
            />
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
            <Form.Control name='tipo_de_sangre_id' as='select' required custom>
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
            <Form.Control name='estado_civil_id' as='select' required custom>
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
            <Form.Label>Contacto de emergencia (nombre):</Form.Label>
            <Form.Control
              name='contacto_emergencia_nombre'
              type='text'
              placeholder='Nombre'
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm='4' sm='4'>
            <Form.Label>Contacto de emergencia (teléfono):</Form.Label>
            <Form.Control
              name='contacto_emergencia_telefono'
              type='text'
              placeholder='Teléfono'
            />
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
    </div>
  );
};

export default CrearPaciente;
