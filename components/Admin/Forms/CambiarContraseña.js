import { useState } from 'react';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import axios from '@/components/utils/axios-helper';
import ModalExito from '@/components/Admin/Modales/ModalExito';
import { LinearProgress } from '@material-ui/core';

const schema = yup.object().shape({
  password: yup.string().required(),
});

const CambiarContraseña = ({ user }) => {
  const [confirmPassword, setconfirmPassword] = useState(false);
  const [contrasenaIncorrecta, setcontrasenaIncorrecta] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [modalExito, setmodalExito] = useState(false);

  return (
    <div
      className='p-2'
      style={{
        background: '#fff',
        color: '#055C9D',
        border: 'solid 3px #42C3F7',
        borderRadius: '10px',
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
      }}>
      {loading && <LinearProgress />}
      <Formik
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          if (values.new_password === values.check_password) {
            setconfirmPassword(false);
            setloading(true);
            try {
              const response = await axios(user.token).post(
                `/v1/cambiarcontrasena`,
                {
                  ...values,
                  username: user.username,
                }
              );
              if (response.status === 200) {
                setcontrasenaIncorrecta(false);
                setconfirmPassword(false);
                resetForm();
                setmodalExito(true);
              }
              setloading(false);
            } catch (error_peticion) {
              setloading(false);
              error_peticion.response.status === 401 &&
                setcontrasenaIncorrecta(true);
              seterror(error_peticion);
            }
          } else {
            setconfirmPassword(true);
          }
        }}
        initialValues={{
          password: '',
          new_password: '',
          check_password: '',
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formPassword'>
              <Form.Label>Contraseña anterior:</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                autoComplete='current-password'
                isInvalid={contrasenaIncorrecta || errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {contrasenaIncorrecta
                  ? 'Contraseña incorrecta'
                  : 'Campo requerido'}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formNewPassword'>
              <Form.Label>Nueva contraseña:</Form.Label>
              <Form.Control
                type='password'
                name='new_password'
                value={values.new_password}
                onChange={handleChange}
                autoComplete='new_password'
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                Campo requerido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirmar nueva contraseña:</Form.Label>
              <Form.Control
                type='password'
                name='check_password'
                value={values.check_password}
                onChange={handleChange}
                autoComplete='check_password'
                isInvalid={errors.password || confirmPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {confirmPassword
                  ? 'Las contraseñas no coinciden'
                  : 'Campo requerido'}
              </Form.Control.Feedback>
            </Form.Group>
            <div className='w-100 d-flex justify-content-center'>
              <Boton color='blue-login' type='submit'>
                Cambiar Contraseña
              </Boton>
            </div>
          </Form>
        )}
      </Formik>
      {/*---------Modal para un cambio de contraseña exitoso */}
      <ModalExito
        show={modalExito}
        handleClose={() => {
          setmodalExito(false);
        }}
        tituloMensaje='Cambio exitoso!'
        mensaje='Su contraseña ha sido cambiada exitosamente'
      />
    </div>
  );
};

export default CambiarContraseña;
