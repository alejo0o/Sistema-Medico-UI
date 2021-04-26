import axios from 'axios';
import { useState } from 'react';
import Login from '@/components/Log In/LogIn';
import { MainContainer } from '@/components/Log In/LoginStyles';
import ModalError from '@/components/Admin/Modales/ModalError';
import { useRouter } from 'next/router';
import withSession from '@/components/utils/session';

export const getServerSideProps = withSession(async ({ req }) => {
  //Revisa si el usuario esta seteado antes de hacer la petición
  const user = req.session.get('user');

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: null,
    },
  };
});

const index = () => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  //-------------Props de la pagina--------------------//
  const router = useRouter();

  //-------------Funciones de la página------------//
  const handleSubmit = (event) => {
    event.preventDefault();
    setloading(true);
    axios
      .post('/api/auth/login', {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.status == 200) {
          setloading(false);
          //router.push('/');
          window.location.replace('/');
        }
      })
      .catch((error_peticion) => {
        seterror(error_peticion);
        setloading(false);
        seterrorModal(true);
      });
  };

  return (
    <MainContainer>
      <Login handleSubmit={handleSubmit} loading={loading} />
      {/*Modal de error ante credenciales invalidas */}
      <ModalError
        show={errorModal}
        handleClose={() => {
          seterrorModal(false);
        }}
        tituloMensaje='Credenciales Inválidas!'
        mensaje='El usuario ingresado es incorrecto, revisar las credenciales ingresadas'
      />
    </MainContainer>
  );
};

export default index;
