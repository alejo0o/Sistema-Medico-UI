import { useState } from 'react';

import { LinearProgress } from '@material-ui/core';
//
import useUser from '@/components/utils/useUser';
import CrearInsumo from '@/components/Admin/Forms/CrearMaterial';
import AdminLayout from '@/components/Layouts/AdminLayout';
import LayoutSkeleton from '@/components/Admin/Skeletons/LayoutSkeleton';
import FormSkeleton from '@/components/Admin/Skeletons/FormSkeleton';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import axios from '@/components/utils/axios-helper';

const index = () => {
  const { user } = useUser({ redirectTo: '/login' });
  //-----Variables de estado de la página-----//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [insumo, setinsumo] = useState({
    nombre: '',
    costo_unitario: '',
    cantidad: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).post('/v1/inventario', values);
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
      <CrearInsumo material={insumo} handleSubmit={handleSubmit} />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El tratamiento se ha ingresado satisfactoriamente!'
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
