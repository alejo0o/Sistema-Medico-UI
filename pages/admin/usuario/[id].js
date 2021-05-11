import { useState, useMemo } from 'react';
import { LinearProgress } from '@material-ui/core';
import generator from 'generate-password';
//
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import EditarUsuario from '@/components/Admin/Forms/EditarUsuario';
import axios from '@/components/utils/axios-helper';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getServerSideProps = withSession(
  async ({ query: { id }, req, res }) => {
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

    const { data: usuarioEdit } = await axios(user.token).get(
      `/v1/usuarioxid/${id}`
    );

    if (!usuarioEdit)
      return {
        notFound: true,
      };

    return {
      props: {
        user,
        usuarioEdit,
        id,
      },
    };
  }
);

const index = ({ user, usuarioEdit, id }) => {
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
      const response = await axios(user.token).put(`/v1/editarusuario/${id}`, {
        ...values,
        password: randompassword,
      });
      if (response.status === 200) {
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
      <EditarUsuario
        handleSubmit={handleSubmit}
        usuario={usuarioEdit}
        generateRandomPassword={generateRandomPassword}
        randompassword={randompassword}
        handlePasswordChange={(event) => {
          setrandompassword(event.target.value);
        }}
        user={user}
        id={id}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='El usuario se ha editado satisfactoriamente!'
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
