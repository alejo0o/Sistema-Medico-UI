import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
//Auth
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import useUser from '@/components/utils/useUser';
import CrearTratamiento from '@/components/Admin/Forms/CrearTratamiento';
import FormSkeleton from '@/components/Admin/Skeletons/FormSkeleton';
import LayoutSkeleton from '@/components/Admin/Skeletons/LayoutSkeleton';

/*export const getServerSideProps = withSession(async ({ req, res }) => {
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

  return {
    props: {
      user,
    },
  };
});*/

const index = () => {
  const { user } = useUser({ redirectTo: '/login' });
  //-----Variables de estado de la página-----//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [tratamiento, settratamiento] = useState({
    nombre: '',
    precio: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).post('/v1/tratamientos', values);
      if (response.status === 201) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
    }
  };
  if (!user || user.isLoggedIn === false)
    return (
      <LayoutSkeleton>
        <FormSkeleton number={1} />
      </LayoutSkeleton>
    );

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <CrearTratamiento handleSubmit={handleSubmit} tratamiento={tratamiento} />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El tratamiento se ha ingresado satisfactoriamente!'
        redireccion='/admin/tratamientos'
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
