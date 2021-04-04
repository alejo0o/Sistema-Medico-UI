import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import HistoriaClinica from '@/components/Admin/HistoriaClinica/HistoriaClinica';
import Loader from '@/components/Loader/Loader';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getStaticPaths = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.apiURL}/getpacientes`);

  const paths = data.map(({ paciente_id }) => ({
    params: { id: paciente_id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const { data: historia_clinica } = await axios.get(
    `${process.env.apiURL}/historiaclinicapaciente/${params?.id}`
  );
  const { data: paciente } = await axios.get(
    `${process.env.apiURL}/pacientes/${params?.id}`
  );

  if (!historia_clinica)
    return {
      notFound: true,
    };

  return {
    props: {
      historia_clinica,
      paciente,
    },
    revalidate: 1, //se refresca cada 1 segundo
  };
};

const index = ({ historia_clinica, paciente }) => {
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
      const response = await axios.delete(
        `${process.env.apiURL}/historiasclinicas/${historia_clinica.historia_clinica_id}`
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

  if (router.isFallback)
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );

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
