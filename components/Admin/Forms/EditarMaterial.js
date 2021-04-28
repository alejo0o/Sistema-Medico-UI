import { Form, Col } from 'react-bootstrap';
import { Boton_A } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup.string().required(),
  costo_unitario: yup.number().required().positive(),
  cantidad: yup.number().required().positive(),
});

const EditarInsumo = ({ handleSubmit, insumo }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Insumo</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={{
          ...insumo,
          nombre: insumo.nombre.toString().trim(),
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='nombre'
                  type='text'
                  value={values.nombre}
                  onChange={handleChange}
                  placeholder='nombre'
                  isInvalid={errors.nombre}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo Requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Costo unitario:</Form.Label>
                <Form.Control
                  name='costo_unitario'
                  type='text'
                  value={values.costo_unitario}
                  onChange={handleChange}
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
                  value={values.cantidad}
                  onChange={handleChange}
                  placeholder='costo unitario'
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
              Editar Insumo
            </Boton_A>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditarInsumo;
