import { useState, useMemo } from 'react';
//
import AdminLayout from '@/components/Layouts/AdminLayout';
import TableUsuarios from '@/components/Admin/Tables/Usuarios';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';

export const getServerSideProps = withSession(async ({ req, res }) => {
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
  //Comprueba que el usuario sea administrador caso contrario lo redirecciona
  if (user.tipo != 'admin')
    return {
      redirect: {
        destination: '/admin/pacientes',
        permanent: false,
      },
    };

  return {
    props: {
      user,
    },
  };
});

const index = ({ user }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [usuario, setusuario] = useState({
    name: '',
    email: '',
    username: '',
    cedula: '',
  });
  const [usuariosQuery, setusuariosQuery] = useState('');
  const [usuariosQueryResultados, setusuariosQueryResultados] = useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (usuariosQuery.trim().length == 0) setusuariosQueryResultados();
  }, [usuariosQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (usuario_info) => {
    setusuario(usuario_info);
    setdeleteModal(true);
  };
  //Maneja la busqueda de los usuarios por boton
  const handleSearchUsuarios = async () => {
    if (usuariosQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: usuariosResultados },
        } = await axios(user.token).get(
          `/v1/usuariosbuscar/${usuariosQuery.trim()}`
        );

        setusuariosQueryResultados(usuariosResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setusuariosQueryResultados();
    }
  };
  //Maneja la busqueda de los usuarios por enter
  const handleSearchUsuariosKey = async (event) => {
    if (event.key === 'Enter') {
      if (usuariosQuery.trim()) {
        setloading(true);
        try {
          const {
            data: { data: usuariosResultados },
          } = await axios(user.token).get(
            `/v1/usuariosbuscar/${usuariosQuery.trim()}`
          );

          setusuariosQueryResultados(usuariosResultados);
          setloading(false);
        } catch (error_peticion) {
          seterror(error_peticion);
          setloading(false);
        }
      } else {
        setusuariosQueryResultados();
      }
    }
  };
  //Se encarga de la eliminación del tratamiento
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/v1/eliminarusuario/${usuario.id}`
      );
      if (response.status == 204) {
        setloading(false);
        setusuariosQueryResultados();
        setdeleteModal(false);
        //router.push(router.asPath); //refresca los props de la pagina
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
    }
  };

  return (
    <AdminLayout>
      <TableUsuarios
        handleChangeQuery={(event) => {
          setusuariosQuery(event.target.value);
        }}
        handleModalDelete={handleModalDelete}
        handleSearchUsuarios={handleSearchUsuarios}
        handleSearchUsuariosKey={handleSearchUsuariosKey}
        usuariosQuery={usuariosQuery}
        usuarios={usuariosQueryResultados ?? []}
      />
      {/*----------Modal para eliminar------- */}
      <ModalEliminar
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar usuario'
        mensaje={`Esta seguro que desea eliminar el usuario de ${usuario.name} con nombre de usuario ${usuario.username} ?`}
      />
    </AdminLayout>
  );
};

export default index;
