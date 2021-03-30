import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
//Componentes
import { getEdad } from '@/components/utils/utils';
import AdminLayout from '@/components/Layouts/AdminLayout';
import PacientesTable from '@/components/Admin/Tables/Pacientes';
import Pagination from '@/components/Admin/Pagination/Paginated';
import ModalInfoPaciente from '@/components/Admin/Modales/InfoPaciente';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';

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
  //-------------Props de la pagina--------------------//
  const router = useRouter();
  const { data: pacientes } = data;
  const { last_page } = data;

  //-------------Funciones de la página------------//
  //Controla cuando aparece el modal de información y
  //consulta si existe una historia clinica con el paciente asociado
  const handleShowInfo = async (paciente_info) => {
    nProgress.start();
    setpaciente(paciente_info);
    try {
      const { data } = await axios.get(
        `${process.env.apiURL}/historiaclinicapaciente/${paciente_info.paciente_id}`
      );
      data ? sethistoria_clinica(true) : sethistoria_clinica(false);
    } catch (error_peticion) {
      seterror(error_peticion);
      nProgress.done();
    }
    nProgress.done();
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

  return (
    <AdminLayout>
      <PacientesTable
        pacientes={pacientes}
        handleShowInfo={handleShowInfo}
        handleModalDelete={handleModalDelete}
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
        mensaje={`Esta seguro que desea eliminar el paciente ${paciente.nombres} ${paciente.apellidos} con CI: ${paciente.cedula}?`}
        handleDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default index;
