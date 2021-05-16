import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
//
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import MedicosTable from '@/components/Admin/Tables/Medicos';
import ModalInfoMedico from '@/components/Admin/Modales/InfoMedico';
import Pagination from '@/components/Admin/Pagination/Paginated';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';

export const getServerSideProps = withSession(
  async ({ query: { page = 1 }, req, res }) => {
    //Revisa si el usuario esta seteado antes de hacer la petición
    const user = req.session.get('user');

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    const { data } = await axios(user.token).get(`/v1/medicos?page=${page}`);

    return {
      props: {
        user,
        data,
      },
    };
  }
);

const index = ({ user, data }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [medico, setmedico] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    especialidades: [],
  });
  const [medicosQuery, setmedicosQuery] = useState('');
  const [medicosResults, setmedicosResults] = useState();
  const [showInfo, setshowInfo] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  //-------------Props de la pagina--------------------//
  const router = useRouter();
  const { data: medicos } = data;
  const { last_page } = data;
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (medicosQuery.trim().length == 0) setmedicosResults();
  }, [medicosQuery]);

  //Se transforma el string json a un arreglo con objetos para renderizar
  const especialidadesToArray = (medico_especialidades) => {
    const especialidades = JSON.parse(medico_especialidades);
    const especialidades_array = [];
    for (var key in especialidades) {
      especialidades_array.push({
        id: key,
        especialidad: especialidades[key],
      });
    }
    return especialidades_array;
  };
  //Controla cuando aparece la información del médico en el modal
  const handleShowInfo = async (medico_info) => {
    const especialidades = especialidadesToArray(medico_info.especialidades);
    setmedico({
      ...medico_info,
      especialidades,
    });
    setshowInfo(true);
  };
  //Sete al médico y muestra el modal de eliminación
  const handleModalDelete = (medico_info) => {
    const especialidades = especialidadesToArray(medico_info.especialidades);
    setmedico({
      ...medico_info,
      especialidades,
    });
    setdeleteModal(true);
  };
  //Maneja la busqueda de los médicos por boton
  const handleSearchMedicos = async () => {
    if (medicosQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: medicosResultados },
        } = await axios(user.token).get(
          `/v1/medicosbusqueda/${medicosQuery.trim()}`
        );
        setmedicosResults(medicosResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setmedicosResults();
    }
  };
  //Maneja la busqueda de los médicos por enter
  const handleSearchMedicosKey = async (event) => {
    if (event.key === 'Enter') {
      if (medicosQuery.trim()) {
        setloading(true);
        try {
          const {
            data: { data: medicosResultados },
          } = await axios(user.token).get(
            `/v1/medicosbusqueda/${medicosQuery.trim()}`
          );
          setmedicosResults(medicosResultados);
          setloading(false);
        } catch (error_peticion) {
          seterror(error_peticion);
          setloading(false);
        }
      } else {
        setmedicosResults();
      }
    }
  };
  //Se encarga de la eliminación del médico
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/v1/medicos/${medico.medico_id}`
      );
      if (response.status == 204) {
        setloading(false);
        setdeleteModal(false);
        router.push(router.asPath); //refresca los props de la pagina
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
    }
  };
  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <MedicosTable
        medicos={medicosResults ?? medicos}
        handleShowInfo={handleShowInfo}
        handleChangeQuery={(event) => {
          setmedicosQuery(String(event.target.value));
        }}
        medicosQuery={medicosQuery}
        handleSearchMedicos={handleSearchMedicos}
        handleModalDelete={handleModalDelete}
        handleSearchMedicosKey={handleSearchMedicosKey}
      />
      <Pagination totalPages={last_page} path='/admin/medicos' />
      {/*----------Modal para ver la información del paciente------- */}

      <ModalInfoMedico
        handleClose={() => {
          setshowInfo(false);
        }}
        show={showInfo}
        medico={medico}
      />

      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar Médico'
        mensaje={`Esta seguro que desea eliminar al médico ${medico.nombres} ${medico.apellidos} 
        con CI: ${medico.cedula}? (TODOS LOS DATOS ASOCIADOS AL MÉDICO COMO CITAS E INFORMACIÓN SERÁN ELIMINADOS)`}
      />
    </AdminLayout>
  );
};

export default index;
