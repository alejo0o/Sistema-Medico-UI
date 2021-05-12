import axios from '@/components/utils/axios-helper';
import { useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import {
  useMediaQuery,
  Switch,
  withStyles,
  LinearProgress,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Head from 'next/head';
//
import Layout from '@/components/Layouts/Layout';
import useUser from '@/components/utils/useUser';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import * as yup from 'yup';
import { Formik } from 'formik';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import CambiarContraseña from '@/components/Admin/Forms/CambiarContraseña';

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

const CustomSwitch = withStyles({
  switchBase: {
    color: '#75E6DA',
    '&$checked': {
      color: '#75E6DA',
    },
    '&$checked + $track': {
      backgroundColor: '#75E6DA',
    },
  },
  checked: {},
  track: {},
})(Switch);

const index = () => {
  const { user } = useUser({ redirectTo: '/login' });
  const matches = useMediaQuery('(max-width: 768px)');
  const [edicion, setedicion] = useState(false);
  const [cambiarContrasena, setcambiarContrasena] = useState(false);
  //
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [cedulaExiste, setcedulaExiste] = useState(false);
  const [usernameExiste, setusernameExiste] = useState(false);
  const [emailExiste, setemailExiste] = useState(false);
  const [modalError, setmodalError] = useState(false); //modal de error
  //Router
  const router = useRouter();

  const handleSubmit = async (values) => {
    setloading(true);

    try {
      const response = await axios(user.token).put(`/v1/editarperfil`, values);
      if (response.status === 200) {
        setloading(false);
        router.reload();
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
    }
  };

  if (!user || user.isLoggedIn === false) return <></>;

  return (
    <Layout user={user}>
      <Head>
        <title>MediClinic | Perfil</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <link rel='icon' href='/company.png' />
      </Head>
      <div className={`${matches ? 'd-block' : 'd-flex'} p-2`}>
        <div
          className={`${matches ? 'w-100' : 'w-25'} h-100 text-white`}
          style={{
            minWidth: matches ? '' : '20em',
          }}>
          <h2 className='text-center'>
            <strong>Perfil</strong>
          </h2>
          <div
            className={`w-100 h-75 d-flex justify-content-center align-items-center`}>
            <img
              src='/user2.png'
              className={`${matches ? 'w-25 h-75' : 'w-50 h-75'}`}
            />
          </div>
          <div>
            <div className='d-flex align-items-center'>
              <h5>Cambiar Contraseña</h5>
              <CustomSwitch
                checked={cambiarContrasena}
                onChange={(event) => {
                  setcambiarContrasena(event.target.checked);
                }}
                name='cambiar-contrasena'
                className={`${matches ? 'mr-1' : 'mr-4'}`}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </div>
          <div>{cambiarContrasena && <CambiarContraseña user={user} />}</div>
        </div>
        <div className={`${matches ? 'w-100 mb-4 mt-4' : 'w-75 pl-3'}  `}>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              setloading(true);
              try {
                const { data: cedulaExiste } = await axios(user.token).get(
                  `/v1/cedulaexisteedit/${values.cedula}/${user.id}`
                );
                const { data: usernameExiste } = await axios(user.token).get(
                  `/v1/usernameexisteedit/${values.username}/${user.id}`
                );
                const { data: emailExiste } = await axios(user.token).get(
                  `/v1/emailexisteedit/${values.email}/${user.id}`
                );

                cedulaExiste ? setcedulaExiste(true) : setcedulaExiste(false);
                usernameExiste
                  ? setusernameExiste(true)
                  : setusernameExiste(false);
                emailExiste ? setemailExiste(true) : setemailExiste(false);
                setloading(false);
                if (!cedulaExiste && !usernameExiste && !emailExiste)
                  handleSubmit(values);
              } catch (error_peticion) {
                seterror(error_peticion);
                setloading(false);
                console.log(error_peticion);
              }
            }}
            initialValues={{
              name: user.name,
              username: user.username,
              email: user.email,
              user_type: user.tipo,
              cedula: user.cedula,
            }}>
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Col
                  sm={`${matches ? 'auto' : '10'}`}
                  className='p-2'
                  style={{
                    background: '#fff',
                    color: '#055C9D',
                    border: 'solid 5px #42C3F7',
                    borderRadius: '10px',
                    boxShadow:
                      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                  }}>
                  {loading && <LinearProgress color='secondary' />}
                  <Row className='p-2'>
                    <Col sm='3'>
                      <strong>Nombre:</strong>
                    </Col>
                    {edicion ? (
                      <Col sm='6'>
                        <Form.Group controlId='nombre'>
                          <Form.Control
                            type='text'
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            placeholder='nombre'
                          />
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col sm='6'>{user.name}</Col>
                    )}
                  </Row>
                  <Row className='p-2'>
                    <Col sm='3'>
                      <strong>Correo:</strong>
                    </Col>

                    {edicion ? (
                      <Col sm='6'>
                        <Form.Group controlId='correo'>
                          <Form.Control
                            type='text'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            placeholder='correo'
                            isInvalid={errors.email || emailExiste}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {emailExiste
                              ? 'El email ingresado ya existe'
                              : 'Campo requerido'}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col sm='6'>{user.email}</Col>
                    )}
                  </Row>
                  <Row className='p-2'>
                    <Col sm='3'>
                      <strong>Nombre de usuario:</strong>
                    </Col>
                    {edicion ? (
                      <Col sm='6'>
                        <Form.Group controlId='nombre_usuario'>
                          <Form.Control
                            type='text'
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            placeholder='nombre de usuario'
                            isInvalid={errors.username || usernameExiste}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {usernameExiste
                              ? 'El nombre de usuario ingresado no está disponible'
                              : 'Campo requerido'}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col sm='6'>{user.username}</Col>
                    )}
                  </Row>
                  <Row className='p-2'>
                    <Col sm='3'>
                      <strong>Tipo de usuario:</strong>
                    </Col>
                    <Col sm='6'>{user.tipo}</Col>
                  </Row>
                  <Row className='p-2'>
                    <Col sm='3'>
                      <strong>Cédula:</strong>
                    </Col>
                    {edicion ? (
                      <Col sm='6'>
                        <Form.Group controlId='dni'>
                          <Form.Control
                            type='text'
                            name='cedula'
                            value={values.cedula}
                            onChange={handleChange}
                            placeholder='nombre de usuario'
                            isInvalid={
                              validatecedula(values.cedula) || cedulaExiste
                            }
                          />
                          <Form.Control.Feedback type='invalid'>
                            {cedulaExiste
                              ? 'La cedula ingresada ya existe'
                              : validatecedula(values.cedula)}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col sm='6'>{user.cedula}</Col>
                    )}
                  </Row>
                </Col>
                <div
                  className={`${
                    matches ? 'w-100' : 'w-75'
                  } text-white p-4 d-flex justify-content-center`}>
                  <h4>Editar</h4>
                  <CustomSwitch
                    checked={edicion}
                    onChange={(event) => {
                      setedicion(event.target.checked);
                    }}
                    name='edicion'
                    className={`${matches ? 'mr-1' : 'mr-4'}`}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  {edicion ? (
                    <Boton color='blue-login' type='submit' size='lg'>
                      Editar
                    </Boton>
                  ) : (
                    <></>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <br />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Revise que los datos ingresados sean correctos!'
      />
    </Layout>
  );
};

export default index;
