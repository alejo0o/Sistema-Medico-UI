import { useState, useMemo } from 'react';
import { LinearProgress } from '@material-ui/core';
import generator from 'generate-password';
//
import AdminLayout from '@/components/Layouts/AdminLayout';

import withSession from '@/components/utils/session';
import CrearUsuario from '@/components/Admin/Forms/CrearUsuario';
import axios from '@/components/utils/axios-helper';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getServerSideProps = withSession(async ({ req, res }) => {
  //Revisa si el usuario esta seteado antes de hacer la petición
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  //Comprueba que el usuario sea administrador caso contrario lo redirecciona
  if (user.tipo != 'admin')
    return {
      redirect: {
        destination: '/admin/pacientes',
        permanent: false,
      },
    };

  return {
    props: {
      user,
    },
  };
});

const index = ({ user }) => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  const [randompassword, setrandompassword] = useState('');

  const generateRandomPassword = () => {
    setrandompassword(
      generator.generate({
        length: 10,
        numbers: true,
      })
    );
  };

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).post('/v1/crearusuario', {
        ...values,
        password: randompassword,
      });
      if (response.status === 201) {
        const response = await axios(user.token).post(
          `/v1/enviarcredencialesemail`,
          {
            ...values,
            password: randompassword,
          }
        );
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <CrearUsuario
        handleSubmit={handleSubmit}
        generateRandomPassword={generateRandomPassword}
        randompassword={randompassword}
        handlePasswordChange={(event) => {
          setrandompassword(event.target.value);
        }}
        user={user}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El usuario se ha ingresado satisfactoriamente!'
        redireccion='/admin/usuarios'
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Revise que los datos ingresados sean correctos!'
      />
    </AdminLayout>
  );
};

export default index;
/*



*/
