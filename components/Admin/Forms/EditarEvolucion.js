import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import Diagnostico from '@/components/Admin/DiagnosticoCIE10/Diagnostico';

const EditarEvolucion = ({
  handleSubmit,
  handleaChange,
  paciente,
  enfermedades,
  evolucion,
  handleChangeCategoria,
  handleChangeSubcategoria,
  categoriasResults,
  subCategoriasRestuls,
  categoriasQuery,
  subcategoriasQuery,
  handleClickCategoria,
  handleClickSubcategoria,
  handleRemoveSubcategoria,
  handleSearchCategorias,
  handleSearchSubcategorias,
}) => {
  return (
    <div className='p-4'>
      <h3 className='mb-2'>Editar Evolución</h3>
      <h4>{`${paciente.nombres} ${paciente.apellidos}`}</h4>
      <h5 className='mb-3'>{`CI: ${paciente.cedula}`}</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} sm='4'>
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              onChange={handleaChange}
              value={evolucion.fecha}
              name='fecha'
              type='date'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Motivo Consulta:</Form.Label>
            <Form.Control
              onChange={handleaChange}
              value={evolucion.motivo_consulta}
              name='motivo_consulta'
              as='textarea'
              placeholder='Motivo de la consulta'
              required
            />
          </Form.Group>

          {paciente.genero_id != 1 ? (
            <Form.Group as={Col} sm='4'>
              <Form.Label>Fecha Última Menstruación:</Form.Label>
              <Form.Control
                onChange={handleaChange}
                value={evolucion.fecha_ultima_menstruacion ?? ''}
                name='fecha_ultima_menstruacion'
                type='date'
              />
            </Form.Group>
          ) : (
            <Form.Group as={Col} sm='4'>
              <Form.Label>Procedimiento:</Form.Label>
              <Form.Control
                onChange={handleaChange}
                value={evolucion.procedimiento}
                name='procedimiento'
                as='textarea'
                placeholder='Procedimiento'
                required
              />
            </Form.Group>
          )}
        </Form.Row>

        <Diagnostico
          enfermedades={enfermedades}
          handleChangeCategoria={handleChangeCategoria}
          handleChangeSubcategoria={handleChangeSubcategoria}
          categoriasResults={categoriasResults}
          subCategoriasRestuls={subCategoriasRestuls}
          categoriasQuery={categoriasQuery}
          subcategoriasQuery={subcategoriasQuery}
          handleClickCategoria={handleClickCategoria}
          handleClickSubcategoria={handleClickSubcategoria}
          handleRemoveSubcategoria={handleRemoveSubcategoria}
          handleSearchCategorias={handleSearchCategorias}
          handleSearchSubcategorias={handleSearchSubcategorias}
        />

        <Form.Row>
          {paciente.genero_id != 1 ? (
            <Form.Group as={Col} sm='4'>
              <Form.Label>Procedimiento:</Form.Label>
              <Form.Control
                onChange={handleaChange}
                value={evolucion.procedimiento}
                name='procedimiento'
                as='textarea'
                placeholder='Procedimiento'
                required
              />
            </Form.Group>
          ) : (
            <></>
          )}
          <Form.Group as={Col} sm='4'>
            <Form.Label>Tratamiento:</Form.Label>
            <Form.Control
              onChange={handleaChange}
              value={evolucion.tratamiento}
              name='tratamiento'
              as='textarea'
              placeholder='Tratamiento'
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='4'>
            <Form.Label>Proximo Control:</Form.Label>
            <Form.Control
              onChange={handleaChange}
              value={evolucion.proximo_control ?? ''}
              name='proximo_control'
              type='date'
            />
          </Form.Group>
        </Form.Row>
        <Boton_A
          className='d-block'
          type='submit'
          size='lg'
          style={{ margin: '0 auto' }}>
          Editar Evolución
        </Boton_A>
      </Form>
    </div>
  );
};

export default EditarEvolucion;
