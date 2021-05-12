import { useState, useMemo, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
//Componentes
import EditarInsumo from '@/components/Admin/Forms/EditarMaterial';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import FormSkeleton from '@/components/Admin/Skeletons/FormSkeleton';
import LayoutSkeleton from '@/components/Admin/Skeletons/LayoutSkeleton';
//Auth
import axios from '@/components/utils/axios-helper';
import useUser from '@/components/utils/useUser';
import { swrHook } from '@/components/utils/utils';
import ErrorPage from '@/components/Error/ErrorPage';

const index = () => {
  //-----Variables de estado de la página-----//
  const { user } = useUser({ redirectTo: '/login' });
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  const router = useRouter();

  const {
    data: insumo,
    isLoading,
    isError,
  } = swrHook(`/v1/inventario/${router.query.id}`, user);
  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).put(
        `/v1/inventario/${router.query.id}`,
        values
      );
      if (response.status === 200) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
      setmodalError(true);
    }
  };

  if (!user || user.isLoggedIn === false || isLoading)
    return (
      <LayoutSkeleton>
        <FormSkeleton number={1} />
      </LayoutSkeleton>
    );

  if (isError) return <ErrorPage code={isError.response.status} />;

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EditarInsumo insumo={insumo} handleSubmit={handleSubmit} />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='El insumo se ha modificado satisfactoriamente!'
        redireccion='/admin/materiales'
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
