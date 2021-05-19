import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
//
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import Inventario from '@/components/Admin/Tables/Inventario';
import axios from '@/components/utils/axios-helper';
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

    const { data } = await axios(user.token).get(`/v1/inventario?page=${page}`);

    return {
      props: {
        data,
        page,
        user,
      },
    };
  }
);

const index = ({ data, user, page }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [material, setmaterial] = useState({
    nombre: '',
    costo_unitario: '',
    cantidad: '',
  });
  const [materialesQuery, setmaterialesQuery] = useState('');
  const [materialesQueryResultados, setmaterialesQueryResultados] = useState();
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  //-------------Props de la pagina--------------------//
  const router = useRouter();
  const { data: materiales } = data;
  const { last_page } = data;
  //-------------Funciones de la página------------//

  useMemo(() => {
    if (materialesQuery.trim().length == 0) setmaterialesQueryResultados();
  }, [materialesQuery]);

  //Maneja el modal de eliminación
  const handleModalDelete = (material) => {
    setmaterial(material);
    setdeleteModal(true);
  };
  //Maneja la busqueda de materiales por botón
  const handleSearchMateriales = async () => {
    if (materialesQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: materialesResultados },
        } = await axios(user.token).get(
          `/v1/materialesbuscar/${materialesQuery.trim()}`
        );
        setmaterialesQueryResultados(materialesResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setmaterialesQueryResultados();
    }
  };
  //Maneja la busqueda de materiales por enter
  const handleSearchMaterialesKey = async (event) => {
    if (event.key === 'Enter') {
      if (materialesQuery.trim()) {
        setloading(true);
        try {
          const {
            data: { data: materialesResultados },
          } = await axios(user.token).get(
            `/v1/materialesbuscar/${materialesQuery.trim()}`
          );
          setmaterialesQueryResultados(materialesResultados);
          setloading(false);
        } catch (error_peticion) {
          seterror(error_peticion);
          setloading(false);
        }
      } else {
        setmaterialesQueryResultados();
      }
    }
  };
  //Se encarga de la eliminación del material
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/v1/inventario/${material.inventario_id}`
      );
      if (response.status == 204) {
        setloading(false);
        setdeleteModal(false);
        setmaterialesQueryResultados();
        router.push(router.asPath); //refresca los props de la pagina
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
    }
  };

  return (
    <AdminLayout>
      <Inventario
        materiales={materialesQueryResultados ?? materiales}
        handleChangeQuery={(event) => {
          setmaterialesQuery(event.target.value);
        }}
        materialesQuery={materialesQuery}
        handleSearchMateriales={handleSearchMateriales}
        handleSearchMaterialesKey={handleSearchMaterialesKey}
        handleModalDelete={handleModalDelete}
      />
      <Pagination totalPages={last_page} path='/admin/materiales' />
      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar Tratamiento'
        mensaje={`Esta seguro que desea eliminar el insumoo (${material.nombre})?`}
      />
    </AdminLayout>
  );
};

export default index;
