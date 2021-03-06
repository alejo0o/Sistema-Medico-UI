import { useState, useRef } from 'react';
import { Form, Col, Row, Overlay, Tooltip } from 'react-bootstrap';
import { LinearProgress } from '@material-ui/core';
//
import { Boton_A, Boton } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from '@/components/utils/axios-helper';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
});

const validatecedula = (value) => {
  let error;
  if (!value) error = 'La cédula es requerida';
  else if (!/^[0-9]{10}$/i.test(value))
    error = 'Es un campo numerico de 10 digitos';
  return error;
};

const CrearUsuario = ({
  handleSubmit,
  randompassword,
  generateRandomPassword,
  handlePasswordChange,
  user,
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  //
  const [cedulaExiste, setcedulaExiste] = useState(false);
  const [usernameExiste, setusernameExiste] = useState(false);
  const [emailExiste, setemailExiste] = useState(false);

  return (
    <div className='p-4'>
      {loading && <LinearProgress color='secondary' />}
      <h4 className='mb-3'>Nuevo Usuario</h4>
      <Formik
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          setloading(true);
          try {
            const { data: cedulaExiste } = await axios(user.token).get(
              `/v1/cedulaexiste/${values.cedula}`
            );
            const { data: usernameExiste } = await axios(user.token).get(
              `/v1/usernameexiste/${values.username}`
            );
            const { data: emailExiste } = await axios(user.token).get(
              `/v1/emailexiste/${values.email}`
            );
            cedulaExiste ? setcedulaExiste(true) : setcedulaExiste(false);
            usernameExiste ? setusernameExiste(true) : setusernameExiste(false);
            emailExiste ? setemailExiste(true) : setemailExiste(false);
            setloading(false);
            if (!cedulaExiste && !usernameExiste && !emailExiste)
              handleSubmit(values);
          } catch (error_peticion) {
            seterror(error_peticion);
            setloading(false);
          }
        }}
        initialValues={{
          name: '',
          username: '',
          email: '',
          user_type: 'admin',
          cedula: '',
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  placeholder='nombre completo'
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre de usuario:</Form.Label>
                <Form.Control
                  name='username'
                  type='text'
                  placeholder='nombre de usuario'
                  isInvalid={errors.username || usernameExiste}
                />
                <Form.Control.Feedback type='invalid'>
                  {usernameExiste
                    ? 'El nombre de usuario ingresado no está disponible'
                    : 'Campo requerido'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Correo:</Form.Label>
                <Form.Control
                  name='email'
                  type='text'
                  placeholder='email'
                  isInvalid={errors.email || emailExiste}
                />
                <Form.Control.Feedback type='invalid'>
                  {emailExiste
                    ? 'El email ingresado ya existe'
                    : 'Campo requerido'}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm='4' controlId='exampleForm.SelectCustom'>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control as='select' name='user_type' custom>
                  <option value='admin'>Administrador</option>
                  <option value='medico'>Médico</option>
                  <option value='user'>Usuario Común</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Cédula:</Form.Label>
                <Form.Control
                  name='cedula'
                  type='text'
                  autoComplete='cedula'
                  placeholder='cedula'
                  required
                  isInvalid={validatecedula(values.cedula) || cedulaExiste}
                />
                <Form.Control.Feedback type='invalid'>
                  {cedulaExiste
                    ? 'La cedula ingresada ya existe'
                    : validatecedula(values.cedula)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Contraseña:</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    value={randompassword}
                    onChange={handlePasswordChange}
                    placeholder='contraseña'
                    required
                  />

                  <Boton
                    ref={target}
                    onClick={() => {
                      generateRandomPassword();
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 1300);
                    }}>
                    <i className='fas fa-key' />
                  </Boton>
                </div>
              </Form.Group>
            </Form.Row>

            <Boton
              className='d-block'
              type='submit'
              size='lg'
              style={{ margin: '0 auto' }}>
              Crear Usuario
            </Boton>
          </Form>
        )}
      </Formik>
      <Overlay target={target.current} show={show} placement='top'>
        {(props) => (
          <Tooltip id='overlay' {...props}>
            LLave generada
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default CrearUsuario;
