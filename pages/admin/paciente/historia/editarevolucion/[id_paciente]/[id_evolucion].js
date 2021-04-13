import { useState, useEffect, useMemo } from 'react';
import nProgress from 'nprogress';
import _ from 'lodash';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import EditarEvolucion from '@/components/Admin/Forms/EditarEvolucion';
import { LinearProgress } from '@material-ui/core';
//Auth
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';

export const getServerSideProps = withSession(
  async ({ query: { id_paciente, id_evolucion }, req }) => {
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

    const { data: evolucion } = await axios(user.token).get(
      `${process.env.apiURL}/evoluciones/${id_evolucion}`
    );

    const { data: paciente } = await axios(user.token).get(
      `${process.env.apiURL}/pacientes/${id_paciente}`
    );
    if (!evolucion)
      return {
        notFound: true,
      };

    return {
      props: {
        evolucion,
        paciente,
        user,
      },
    };
  }
);

const index = ({ evolucion, paciente, user }) => {
  //----------Variables de estado de la pagina---------//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [evolucionEdit, setevolucionEdit] = useState({
    historia_clinica_id: '',
    fecha: '',
    motivo_consulta: '',
    fecha_ultima_menstruacion: '',
    procedimiento: '',
    diagnostico: '[]',
    tratamiento: '',
    proximo_control: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  const [categoriasQuery, setcategoriasQuery] = useState('');
  const [subcategoriasQuery, setsubcategoriasQuery] = useState('');
  const [categoriasResults, setcategoriasResults] = useState([]);
  const [subCategoriasRestuls, setsubCategoriasRestuls] = useState([]);
  const [enfermedades, setenfermedades] = useState([]);
  //----------------Props de la pagina---------------//
  //--------------Funciones de la página-----------//
  //Cambia cada vez que se detecta un cambio en el arreglo de enfermedades

  useEffect(() => {
    setevolucionEdit({
      ...evolucionEdit,
      diagnostico: JSON.stringify(enfermedades),
    });
  }, [enfermedades]);
  //Se ejecuta 1 vez para setear los valores de la evolucion y su diagnostico
  useEffect(() => {
    setevolucionEdit(evolucion);
    setenfermedades(JSON.parse(evolucion.diagnostico));
  }, []);

  useMemo(() => {
    if (categoriasQuery.trim().length == 0) setcategoriasResults([]);
    if (subcategoriasQuery.trim().length == 0) setsubCategoriasRestuls([]);
  }, [categoriasQuery, subcategoriasQuery]);
  //Maneja los cambios dentro de la variable historia_clinica
  const handleChange = (event) => {
    setevolucionEdit({
      ...evolucionEdit,
      [event.target.name]: event.target.value,
    });
  };
  //Maneja la peticion de editar
  const handleSubmit = async (event) => {
    event.preventDefault();
    nProgress.start();
    try {
      const response = await axios(user.token).put(
        `/v1/evoluciones/${evolucionEdit.evolucion_id}`,
        evolucionEdit
      );
      if (response.status == 200) {
        nProgress.done();
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      nProgress.done();
      setmodalError(true);
    }
  };

  //Revisa si un elemento ya esta en el diagnostico usando LODASH
  const subcategoriaExiste = (elemento) => {
    if (
      _.find(enfermedades, (enfermedad) => enfermedad.codigo == elemento.codigo)
    )
      return true;
    else return false;
  };
  //Maneja la busqueda de categorias por codigo
  const handleChangeCategoria = async (event) => {
    setcategoriasQuery(String(event.target.value));
  };
  //Maneja la busqueda de subcategorias por codigo
  const handleChangeSubcategoria = async (event) => {
    setsubcategoriasQuery(String(event.target.value));
  };
  //Maneja la selección de categoria hacia subcategoria
  const handleClickCategoria = (categoria_codigo) => {
    setsubcategoriasQuery(String(categoria_codigo).trim());
  };
  //Maneja la selección de enfermedades
  const handleClickSubcategoria = (subcategoria_escogida) => {
    enfermedades.length == 0
      ? setenfermedades(enfermedades.concat(subcategoria_escogida))
      : subcategoriaExiste(subcategoria_escogida)
      ? ''
      : setenfermedades(enfermedades.concat(subcategoria_escogida));
  };
  //Elimina la selección de una enfermedad
  const handleRemoveSubcategoria = (subcategoria_escogida) => {
    //
    setenfermedades(_.without(enfermedades, subcategoria_escogida));
  };
  //Maneja la busqueda de categorias
  const handleSearchCategorias = async () => {
    if (categoriasQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: categorias },
        } = await axios(user.token).get(
          `/v1/categoriascodigo/${categoriasQuery}`
        );
        setcategoriasResults(categorias);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setcategoriasResults([]);
    }
  };
  //Maneja la busqueda de subcategorias
  const handleSearchSubcategorias = async () => {
    if (subcategoriasQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: subcategorias },
        } = await axios(user.token).get(
          `/v1/subcategoriascodigo/${subcategoriasQuery}`
        );
        setsubCategoriasRestuls(subcategorias);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setcategoriasResults([]);
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EditarEvolucion
        paciente={paciente}
        evolucion={evolucionEdit}
        enfermedades={enfermedades}
        handleSubmit={handleSubmit}
        handleaChange={handleChange}
        handleChangeCategoria={handleChangeCategoria}
        handleChangeSubcategoria={handleChangeSubcategoria}
        categoriasResults={categoriasResults}
        subCategoriasRestuls={subCategoriasRestuls}
        categoriasQuery={categoriasQuery}
        subcategoriasQuery={subcategoriasQuery}
        handleClickCategoria={handleClickCategoria}
        handleClickSubcategoria={handleClickSubcategoria}
        handleRemoveSubcategoria={handleRemoveSubcategoria}
        handleSearchCategorias={handleSearchCategorias}
        handleSearchSubcategorias={handleSearchSubcategorias}
      />

      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='Se ha editado la información de la evolucion satisfactoriamente!'
        redireccion={`/admin/paciente/historia/evoluciones/${paciente.paciente_id}`}
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Se ha producido un error revise los datos ingresados o intentelo más tarde'
      />
    </AdminLayout>
  );
};

export default index;
