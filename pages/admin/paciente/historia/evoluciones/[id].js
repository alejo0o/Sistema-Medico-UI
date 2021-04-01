import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import Pagination from '@/components/Admin/Pagination/Paginated';
import EvolucionesTable from '@/components/Admin/Tables/Evoluciones';
import ModalInfoEvolucion from '@/components/Admin/Modales/InfoEvolucion';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import EvolucionesTableMUI from '@/components/Admin/Tables/EvolucionesMUI';

export const getServerSideProps = async ({ query: { page = 1, id } }) => {
  //Retorna las evoluciones del paciente con el id indicado
  const { data } = await axios.get(
    `${process.env.apiURL}/evolucionespaciente/${id}`
  );
  //Retorna el paciente con el id indicado
  const { data: paciente } = await axios.get(
    `${process.env.apiURL}/pacientes/${id}`
  );

  return {
    props: {
      data,
      paciente,
      page,
    },
  };
};

const index = ({ data, paciente }) => {
  //----------Variables de estado de la pagina---------//
  const [enfermedades, setenfermedades] = useState([
    //estado previo de la variable
    {
      subcategoria_descripcion: '',
    },
  ]);
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
    setloading(true);
    try {
      const { data: enfermedades_CIE10 } = await axios.get(
        `${process.env.apiURL}/enfermedadespaciente/${paciente.paciente_id}/${evolucion_m.evolucion_id}`
      );
      setenfermedades(enfermedades_CIE10);
      setevolucion(evolucion_m);
      setloading(false);
      setshowInfo(true);
    } catch (error) {
      seterror(error);
      setloading(false);
    }
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
      const response = await axios.delete(
        `${process.env.apiURL}/evoluciones/${evolucion.evolucion_id}`
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
          enfermedades={enfermedades}
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
