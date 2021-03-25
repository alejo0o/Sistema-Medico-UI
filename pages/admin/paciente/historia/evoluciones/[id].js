import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminLayout from '../../../../../components/Layouts/AdminLayout';
import Pagination from '../../../../../components/Admin/Pagination/Paginated';
import EvolucionesTable from '../../../../../components/Admin/Tables/Evoluciones';
import ModalInfoEvolucion from '../../../../../components/Admin/Modales/InfoEvolucion';
import LinearProgress from '@material-ui/core/LinearProgress';

export const getServerSideProps = async ({ query: { page = 1, id } }) => {
  const { data } = await axios.get(
    `${process.env.apiURL}/evolucionespaciente/${id}`
  );
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
  //Variables de estado de la pagina
  const [enfermedades, setenfermedades] = useState([
    {
      subcategoria_descripcion: '',
    },
  ]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [evolucion, setevolucion] = useState({
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

  //props de la pagina
  const { data: evoluciones } = data;
  const { last_page } = data;

  //Funciones de la página
  const handleCloseInfo = () => setshowInfo(false);
  const handleShowInfo = async (evolucion_m) => {
    setloading(true);
    try {
      const { data } = await axios.get(
        `${process.env.apiURL}/enfermedadespaciente/${paciente.paciente_id}/${evolucion_m.evolucion_id}`
      );
      setenfermedades(data);
      setevolucion(evolucion_m);
      setloading(false);
      setshowInfo(true);
    } catch (error) {
      seterror(error);
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EvolucionesTable
        evoluciones={evoluciones}
        handleShowInfo={handleShowInfo}
        paciente={paciente}
      />
      <Pagination
        totalPages={last_page}
        path={`/admin/paciente/historia/evoluciones/${useRouter().query.id}`}
      />
      {/*----------Modal para ver la información del paciente------- */}
      {!loading && (
        <ModalInfoEvolucion
          show={showInfo}
          handleClose={handleCloseInfo}
          paciente={paciente}
          enfermedades={enfermedades}
          evolucion={evolucion}
        />
      )}
    </AdminLayout>
  );
};

export default index;
