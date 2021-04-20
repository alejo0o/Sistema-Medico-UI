import { useRouter } from 'next/router';
import { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import Pagination from '@/components/Admin/Pagination/Paginated';
import ModalInfoEvolucion from '@/components/Admin/Modales/InfoEvolucion';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import EvolucionesTableMUI from '@/components/Admin/Tables/EvolucionesMUI';
//Auth
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';

export const getServerSideProps = withSession(
  async ({ query: { page = 1, id }, req }) => {
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

    //Retorna las evoluciones del paciente con el id indicado
    const { data } = await axios(user.token).get(
      `/v1/evolucionespaciente/${id}`
    );
    //Retorna el paciente con el id indicado
    const { data: paciente } = await axios(user.token).get(
      `/v1/pacientes/${id}`
    );

    return {
      props: {
        data,
        paciente,
        page,
        user,
      },
    };
  }
);

const index = ({ data, paciente, user }) => {
  //----------Variables de estado de la pagina---------//
  const [loading, setloading] = useState(false); //define el loader de la página
  const [error, seterror] = useState(null); //si exsite un error se setea la var
  const [evolucion, setevolucion] = useState({
    //estado previo de la variable
    historia_clinica_id: '',
    fecha: '',
    motivo_consulta: '',
    fecha_ultima_menstruacion: '',
    procedimiento: '',
    diagnostico: '',
    tratamiento: '',
    proximo_control: '',
  });
  const [showInfo, setshowInfo] = useState(false); //variable para el modal de info evolucion
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  //----------------Props de la pagina---------------//
  const { data: evoluciones } = data;
  const { last_page } = data;
  const router = useRouter();

  //--------------Funciones de la página-----------//
  //Obtiene las enfermedades del paciente del CIE10
  const handleShowInfo = async (evolucion_m) => {
    setevolucion(evolucion_m);
    setshowInfo(true);
  };
  //Controla cuando aparece el modal de eliminación
  const handleModalDelete = (evolucion_m) => {
    setevolucion(evolucion_m);
    setdeleteModal(true);
  };
  //Controla la petición de eliminación de un paciente
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/v1/evoluciones/${evolucion.evolucion_id}`
      );
      if (response.status == 204) {
        setloading(false);
        setdeleteModal(false);
        router.push(router.asPath); //refresca los props de la pagina
      }
    } catch (error_peticion) {
      setloading(false);
      seterror(error_peticion);
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EvolucionesTableMUI
        evoluciones={evoluciones}
        handleShowInfo={handleShowInfo}
        paciente={paciente}
        handleModalDelete={handleModalDelete}
      />
      <Pagination
        totalPages={last_page}
        path={`/admin/paciente/historia/evoluciones/${router.query.id}`}
      />
      {/*----------Modal para ver la información del paciente------- */}
      {!loading && (
        <ModalInfoEvolucion
          show={showInfo}
          handleClose={() => setshowInfo(false)}
          paciente={paciente}
          evolucion={evolucion}
        />
      )}
      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        show={deleteModal}
        handleClose={() => setdeleteModal(false)}
        titulo='Eliminar Evolución'
        mensaje={`Esta seguro que desea eliminar la evolución de ${evolucion.fecha}, del paciente ${paciente.nombres} ${paciente.apellidos} con CI: ${paciente.cedula}?`}
        handleDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default index;
