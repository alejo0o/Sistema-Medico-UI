import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
//Helper para la verificación del usuario
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import Pagination from '@/components/Admin/Pagination/Paginated';
import TratamientosTable from '@/components/Admin/Tables/Tratamientos';
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

    const { data } = await axios(user.token).get(
      `/v1/tratamientos?page=${page}`
    );

    return {
      props: {
        data,
        page,
        user,
      },
    };
  }
);
const index = ({ data, user }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [tratamiento, settratamiento] = useState({
    nombre: '',
    precio: '',
  });
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [tratamientosQuery, settratamientosQuery] = useState('');
  const [
    tratamientosQueryResultados,
    settratamientosQueryResultados,
  ] = useState();
  //-------------Props de la pagina--------------------//
  const router = useRouter();
  const { data: tratamientos } = data;
  const {
    meta: { last_page },
  } = data;
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (tratamientosQuery.trim().length == 0) settratamientosQueryResultados();
  }, [tratamientosQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (tratamiento_info) => {
    settratamiento(tratamiento_info);
    setdeleteModal(true);
  };
  //Maneja la busqueda de los tratamientos por boton
  const handleSearchTratamientos = async () => {
    if (tratamientosQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: tratamientosResultados },
        } = await axios(user.token).get(
          `/v1/tratamientosbuscar/${tratamientosQuery.trim()}`
        );
        settratamientosQueryResultados(tratamientosResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      settratamientosQueryResultados();
    }
  };
  //Maneja la busqueda de los tratamientos por enter
  const handleSearchTratamientosKey = async (event) => {
    if (event.key === 'Enter') {
      if (tratamientosQuery.trim()) {
        setloading(true);
        try {
          const {
            data: { data: tratamientosResultados },
          } = await axios(user.token).get(
            `/v1/tratamientosbuscar/${tratamientosQuery.trim()}`
          );
          settratamientosQueryResultados(tratamientosResultados);
          setloading(false);
        } catch (error_peticion) {
          seterror(error_peticion);
          setloading(false);
        }
      } else {
        settratamientosQueryResultados();
      }
    }
  };
  //Se encarga de la eliminación del tratamiento
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/v1/tratamientos/${tratamiento.tratamiento_id}`
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
      <TratamientosTable
        handleChangeQuery={(event) => {
          settratamientosQuery(event.target.value);
        }}
        handleModalDelete={handleModalDelete}
        handleSearchTratamientos={handleSearchTratamientos}
        handleSearchTratamientosKey={handleSearchTratamientosKey}
        tratamientos={tratamientosQueryResultados ?? tratamientos}
        tratamientosQuery={tratamientosQuery}
      />
      <Pagination totalPages={last_page} path='/admin/tratamientos' />
      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar Tratamiento'
        mensaje={`Esta seguro que desea eliminar el tratamiento (${tratamiento.nombre})?`}
      />
    </AdminLayout>
  );
};

export default index;
