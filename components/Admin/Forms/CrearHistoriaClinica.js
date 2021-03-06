import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';

const CrearHistoriaClinica = ({ handleSubmit, handleaChange, paciente }) => {
  return (
    <div className='p-4'>
      <h3 className='mb-2'>Nueva Historia Clínica</h3>
      <h4>{`${paciente.nombres} ${paciente.apellidos}`}</h4>
      <h5 className='mb-3'>{`CI: ${paciente.cedula}`}</h5>
      <Form onSubmit={handleSubmit} onChange={handleaChange}>
        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Alergias:</Form.Label>
            <Form.Control
              name='alergias'
              as='textarea'
              placeholder='Alergias'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Antecedentes Patológicos:</Form.Label>
            <Form.Control
              name='antecedentes_patologicos'
              as='textarea'
              placeholder='Antecedentes Patológicos'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Antecedentes Quirúrgicos:</Form.Label>
            <Form.Control
              name='antecedentes_quirurgicos'
              as='textarea'
              placeholder='Antecedentes Quirúrgicos'
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Antecedentes Familiares:</Form.Label>
            <Form.Control
              name='antecedentes_familiares'
              as='textarea'
              placeholder='Antecedentes Familiares'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Medicamentes Subministrados:</Form.Label>
            <Form.Control
              name='medicamentos_subministrados'
              as='textarea'
              placeholder='Medicamentes Subministrados'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Método Anticonceptivo:</Form.Label>
            <Form.Control
              name='metodo_anticonceptivo'
              as='textarea'
              placeholder='Método Anticonceptivo'
              required
            />
          </Form.Group>
        </Form.Row>

        {paciente.genero_id != 1 && (
          <Form.Row>
            <Form.Group as={Col} sm='4'>
              <Form.Label>Partos:</Form.Label>
              <Form.Control
                name='partos'
                type='text'
                placeholder='# de partos'
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm='4'>
              <Form.Label>Cesáreas:</Form.Label>
              <Form.Control
                name='cesareas'
                type='text'
                placeholder='Cesáreas'
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm='4'>
              <Form.Label>Gestas:</Form.Label>
              <Form.Control
                name='gestas'
                type='text'
                placeholder='# de Gestas'
                required
              />
            </Form.Group>
          </Form.Row>
        )}

        <Form.Row>
          {paciente.genero_id != 1 && (
            <Form.Group as={Col} sm='4'>
              <Form.Label>Abortos:</Form.Label>
              <Form.Control
                name='abortos'
                type='text'
                placeholder='# de Abortos'
                required
              />
            </Form.Group>
          )}
          <Form.Group as={Col} sm='4'>
            <Form.Label>Hábitos (opcional):</Form.Label>
            <Form.Control name='habitos' as='textarea' placeholder='Hábitos' />
          </Form.Group>
        </Form.Row>
        <Boton_A
          className='d-block'
          type='submit'
          size='lg'
          style={{ margin: '0 auto' }}>
          Crear Historial
        </Boton_A>
      </Form>
    </div>
  );
};

export default CrearHistoriaClinica;
