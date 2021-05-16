import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
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
import ModalError from '@/components/Admin/Modales/ModalError';
import { format, parseISO } from 'date-fns';

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
      `/v1/evolucionespaciente/${id}?page=${page}`
    );
    //Retorna el paciente con el id indicado
    const { data: paciente } = await axios(user.token).get(
      `/v1/pacientes/${id}`
    );

    if (!data || !paciente) {
      return {
        notFound: true,
      };
    }

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
    medicacion: '',
    indicaciones: '',
    proximo_control: '',
  });
  const [evolucionesQuery, setevolucionesQuery] = useState('');
  const [evolucionesResultados, setevolucionesResultados] = useState();
  const [showInfo, setshowInfo] = useState(false); //variable para el modal de info evolucion
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [modalError, setmodalError] = useState();
  //----------------Props de la pagina---------------//
  const { data: evoluciones } = data;
  const { last_page } = data;
  const router = useRouter();

  //--------------Funciones de la página-----------//
  useMemo(() => {
    if (evolucionesQuery.trim().length == 0) setevolucionesResultados();
  }, [evolucionesQuery]);
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

  const parseFechaBusqueda = (fecha_busqueda) => {
    try {
      return format(parseISO(fecha_busqueda), 'PP');
    } catch (error) {
      setmodalError(true);
      return;
    }
  };
  //Realiza la petición de buscar las evoluciones por boton
  const handleSearchEvoluciones = async () => {
    if (
      evolucionesQuery.trim() &&
      parseFechaBusqueda(evolucionesQuery.trim())
    ) {
      setloading(true);
      try {
        const {
          data: { data: evolucionesResultados },
        } = await axios(user.token).get(
          `/v1/evolucionesxfecha/${router.query.id}/${parseFechaBusqueda(
            evolucionesQuery.trim()
          )}`
        );
        setevolucionesResultados(evolucionesResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setevolucionesResultados();
    }
  };
  //Realiza la petición de buscar las por enter
  const handleSearchEvolucionesKey = async (event) => {
    if (event.key === 'Enter') {
      if (
        evolucionesQuery.trim() &&
        parseFechaBusqueda(evolucionesQuery.trim())
      ) {
        setloading(true);
        try {
          const {
            data: { data: evolucionesResultados },
          } = await axios(user.token).get(
            `/v1/evolucionesxfecha/${router.query.id}/${parseFechaBusqueda(
              evolucionesQuery.trim()
            )}`
          );
          setevolucionesResultados(evolucionesResultados);
          setloading(false);
        } catch (error_peticion) {
          seterror(error_peticion);
          setloading(false);
        }
      } else {
        setevolucionesResultados();
      }
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EvolucionesTableMUI
        evoluciones={evolucionesResultados ?? evoluciones}
        handleShowInfo={handleShowInfo}
        paciente={paciente}
        handleModalDelete={handleModalDelete}
        handleChangeQuery={(event) => {
          setevolucionesQuery(String(event.target.value));
        }}
        evolucionesQuery={evolucionesQuery}
        handleSearchEvoluciones={handleSearchEvoluciones}
        handleSearchEvolucionesKey={handleSearchEvolucionesKey}
      />
      <Pagination
        totalPages={last_page}
        path={`/admin/paciente/historia/evoluciones/${router.query.id}`}
      />
      {/*----------Modal para ver la información de la evolución------- */}
      {!loading && (
        <ModalInfoEvolucion
          show={showInfo}
          handleClose={() => setshowInfo(false)}
          paciente={paciente}
          evolucion={evolucion}
        />
      )}
      {/*----------Modal de error------- */}
      <ModalError
        show={modalError}
        handleClose={() => {
          setmodalError(false);
        }}
        tituloMensaje='Error!'
        mensaje='Error al buscar con la fecha especificada. Ejemplo para el formato de fecha: 2000-01-31'
      />
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
