import axios from 'axios';
import { useState } from 'react';
import { getEdad } from '../../../components/utils/utils';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import PacientesTable from '../../../components/Admin/Tables/Pacientes';
import Pagination from '../../../components/Admin/Pagination/Paginated';
import ModalInfoPaciente from '../../../components/Admin/Modales/InfoPaciente';

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const { data } = await axios.get(
    `${process.env.apiURL}/pacientes?page=${page}`
  );

  return {
    props: {
      data,
      page,
    },
  };
};

const index = ({ data }) => {
  //Variables de estado de la pagina
  const [paciente, setpaciente] = useState({
    apellidos: '',
    cedula: '',
    contacto_emergencia_nombre: null,
    contacto_emergencia_telefono: null,
    direccion: '',
    estado_civil_id: '',
    etnia_id: '',
    fechanacimiento: '',
    lugarnacimiento: '',
    nivel_de_instruccion_id: '',
    nombres: '',
    numero_hijos: '',
    ocupacion: '',
    paciente_id: '',
    telefono: '',
    tipo_de_sangre_id: '',
  });
  const [showInfo, setshowInfo] = useState(false); //variable para el modal de info Paciente

  //Props de la pagina
  const { data: pacientes } = data;
  const { last_page } = data;

  //Funciones de la página
  const handleCloseInfo = () => setshowInfo(false);
  const handleShowInfo = (paciente) => {
    setshowInfo(true);
    setpaciente(paciente);
  };

  return (
    <AdminLayout>
      <PacientesTable pacientes={pacientes} handleShowInfo={handleShowInfo} />
      <Pagination totalPages={last_page} path='/admin/pacientes' />
      {/*----------Modal para ver la información del paciente------- */}
      <ModalInfoPaciente
        show={showInfo}
        handleClose={handleCloseInfo}
        paciente={paciente}
        getEdad={getEdad}
      />
    </AdminLayout>
  );
};

export default index;
