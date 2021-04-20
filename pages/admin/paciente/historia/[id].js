import { useState } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import HistoriaClinica from '@/components/Admin/HistoriaClinica/HistoriaClinica';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
//Auth
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';

export const getServerSideProps = withSession(async ({ params, req }) => {
  //Revisa si el usuario esta seteado antes de hacer la petición
  const user = req.session.get('user');
  //Redirecciona si no existe un usuario logeado
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  //Redirecciona al usuario que no tiene los permisos adecuados
  if (user.tipo != 'medico' && user.tipo != 'admin') {
    return {
      redirect: {
        destination: '/admin/pacientes',
        permanent: false,
      },
    };
  }

  const { data: historia_clinica } = await axios(user.token).get(
    `/v1/historiaclinicapaciente/${params?.id}`
  );
  const { data: paciente } = await axios(user.token).get(
    `/v1/pacientes/${params?.id}`
  );
  if (!historia_clinica || !paciente) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      historia_clinica,
      paciente,
      user,
    },
  };
});

const index = ({ historia_clinica, paciente, user }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  //----------------Props de la pagina---------------//
  const router = useRouter();
  //--------------Funciones de la página-----------//
  //Controla la petición de eliminación de un paciente
  const handleModalDelete = () => {
    setdeleteModal(true);
  };
  //Controla la eliminación de la historia clínica
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/v1/historiasclinicas/${historia_clinica.historia_clinica_id}`
      );
      if (response.status == 204) {
        setdeleteModal(false);
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
      setmodalError(true);
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <HistoriaClinica
        historia_clinica={historia_clinica}
        paciente={paciente}
        handleModalDelete={handleModalDelete}
      />
      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        show={deleteModal}
        handleClose={() => setdeleteModal(false)}
        titulo='Eliminar Historial Clínico'
        mensaje={`Esta seguro que desea eliminar la Historia Clínica de ${paciente.nombres} ${paciente.apellidos} con CI: ${paciente.cedula}? (TODAS SUS EVOLUCIONES SE ELIMINARÁN)`}
        handleDelete={handleDelete}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Elimincación Exitosa'
        mensaje='Se ha eliminado el historial satisfactoriamente!'
        redireccion='/admin/pacientes'
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Se ha producido un error revise los datos ingresados o intentelo más tarde'
      />
    </AdminLayout>
  );
};

export default index;
