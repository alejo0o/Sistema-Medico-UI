import { Form, Col, Row } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup.string().required(),
  costo_unitario: yup.number().required().positive(),
  cantidad: yup.number().required().positive(),
});

const CrearMaterial = ({ handleSubmit, material }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nuevo Insumo Médico</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={material}>
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
                <Form.Label>Costo Unitario:</Form.Label>
                <Form.Control
                  name='costo_unitario'
                  type='text'
                  placeholder='costo unitario'
                  isInvalid={errors.costo_unitario}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo numérico requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Cantidad:</Form.Label>
                <Form.Control
                  name='cantidad'
                  type='text'
                  placeholder='cantidad'
                  isInvalid={errors.cantidad}
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
              Crear Insumo
            </Boton_A>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearMaterial;
