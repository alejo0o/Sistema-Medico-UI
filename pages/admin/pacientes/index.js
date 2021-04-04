import axios from 'axios';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { LinearProgress } from '@material-ui/core';
//Componentes
import { getEdad } from '@/components/utils/utils';
import AdminLayout from '@/components/Layouts/AdminLayout';
import Pagination from '@/components/Admin/Pagination/Paginated';
import ModalInfoPaciente from '@/components/Admin/Modales/InfoPaciente';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import PacientesTableMUI from '@/components/Admin/Tables/PacientesMUI.js';

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
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [paciente, setpaciente] = useState({
    //estado previo de la variable
    apellidos: '',
    cedula: '',
    contacto_emergencia_nombre: '',
    contacto_emergencia_telefono: '',
    direccion: '',
    estado_civil_id: '',
    etnia_id: '',
    genero_id: '',
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
  const [historia_clinica, sethistoria_clinica] = useState(false); //define si existe una historia asociada a un paciente
  const [showInfo, setshowInfo] = useState(false); //variable para el modal de info Paciente
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [pacientesQuery, setpacientesQuery] = useState('');
  const [pacientesQueryResultados, setpacientesQueryResultados] = useState();
  //-------------Props de la pagina--------------------//
  const router = useRouter();
  const { data: pacientes } = data;
  const { last_page } = data;

  //-------------Funciones de la página------------//
  useMemo(() => {
    if (pacientesQuery.trim().length == 0)
      setpacientesQueryResultados(pacientes);
  }, [pacientesQuery]);
  //Controla cuando aparece el modal de información y
  //consulta si existe una historia clinica con el paciente asociado
  const handleShowInfo = async (paciente_info) => {
    setloading(true);
    setpaciente(paciente_info);
    try {
      const { data } = await axios.get(
        `${process.env.apiURL}/historiaclinicapaciente/${paciente_info.paciente_id}`
      );
      data ? sethistoria_clinica(true) : sethistoria_clinica(false);
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
    }
    setloading(false);
    setshowInfo(true);
  };
  //Controla cuando aparece el modal de eliminación
  const handleModalDelete = (paciente) => {
    setpaciente(paciente);
    setdeleteModal(true);
  };
  //Controla la petición de eliminación de un paciente
  const handleDelete = async () => {
    nProgress.start();
    try {
      const response = await axios.delete(
        `${process.env.apiURL}/pacientes/${paciente.paciente_id}`
      );
      if (response.status == 204) {
        nProgress.done();
        setdeleteModal(false);
        router.push(router.asPath); //refresca los props de la pagina
      }
    } catch (error_peticion) {
      nProgress.done();
      seterror(error_peticion);
    }
  };

  //Maneja los cambios en el query de busqueda
  const handleChangeQuery = (event) => {
    setpacientesQuery(String(event.target.value));
  };
  //Realiza la petición de buscar los pacientes
  const handleSearchPacientes = async () => {
    if (pacientesQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: pacientesResultados },
        } = await axios.get(
          `${process.env.apiURL}/getpacientesbusqueda/${pacientesQuery.trim()}`
        );
        setpacientesQueryResultados(pacientesResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setpacientesQueryResultados();
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <PacientesTableMUI
        pacientes={pacientesQueryResultados ?? pacientes}
        handleShowInfo={handleShowInfo}
        handleModalDelete={handleModalDelete}
        handleChangeQuery={handleChangeQuery}
        pacientesQuery={pacientesQuery}
        handleSearchPacientes={handleSearchPacientes}
      />
      <Pagination totalPages={last_page} path='/admin/pacientes' />
      {/*----------Modal para ver la información del paciente------- */}
      <ModalInfoPaciente
        show={showInfo}
        handleClose={() => setshowInfo(false)}
        paciente={paciente}
        getEdad={getEdad}
        historia_clinica={historia_clinica}
      />
      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        show={deleteModal}
        handleClose={() => setdeleteModal(false)}
        titulo='Eliminar Paciente'
        mensaje={`Esta seguro que desea eliminar el paciente ${paciente.nombres} ${paciente.apellidos} con CI: ${paciente.cedula}? (SU HISTORIAL CLÍNICO TAMBIEN SE ELIMINARÁ).`}
        handleDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default index;
