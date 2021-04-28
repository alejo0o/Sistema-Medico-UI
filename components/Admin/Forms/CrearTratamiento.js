import { Form, Col, Row } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup.string().required(),
  precio: yup.number().required().positive(),
});

const CrearTratamiento = ({ handleSubmit, tratamiento }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nuevo Tratamiento</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={tratamiento}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='nombre'
                  type='text'
                  placeholder='nombre'
                  isInvalid={errors.nombre}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo Requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                  name='precio'
                  type='text'
                  placeholder='precio'
                  isInvalid={errors.precio}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo numérico requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Boton_A
              className='d-block'
              type='submit'
              size='lg'
              style={{ margin: '0 auto' }}>
              Crear Tratamiento
            </Boton_A>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearTratamiento;
