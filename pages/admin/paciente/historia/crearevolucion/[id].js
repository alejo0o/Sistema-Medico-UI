import { useState, useEffect, useMemo } from 'react';
import nProgress from 'nprogress';
import _ from 'lodash';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import CrearEvolucion from '@/components/Admin/Forms/CrearEvolucion';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import { LinearProgress } from '@material-ui/core';
//Auth
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';

export const getServerSideProps = withSession(async ({ params, req }) => {
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
  //Obtiene la historia clinica del paciente indicado
  const { data: historiaClinica } = await axios(user.token).get(
    `/v1/historiaclinicapaciente/${params?.id}`
  );
  //Extrae los datos del paciente indicado
  const { data: paciente } = await axios(user.token).get(
    `/v1/pacientes/${params?.id}`
  );

  if (!historiaClinica || !paciente) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      paciente,
      historiaClinica,
      user,
    },
  };
});

const index = ({ paciente, historiaClinica, user }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [evolucion, setevolucion] = useState({
    //estado previo de la variable
    historia_clinica_id: historiaClinica.historia_clinica_id,
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
  /*---------------Queries para las busquedas------ */

  useMemo(() => {
    if (categoriasQuery.trim().length == 0) setcategoriasResults([]);
    if (subcategoriasQuery.trim().length == 0) setsubCategoriasRestuls([]);
  }, [categoriasQuery, subcategoriasQuery]);

  //-------------Props de la pagina--------------------//
  //-------------Funciones de la página------------//
  //Maneja los cambios dentro de la variable evolucion
  const handleChange = (event) => {
    setevolucion({
      ...evolucion,
      [event.target.name]: event.target.value,
    });
  };
  //Realiza el submit (post) del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const response = await axios(user.token).post(`/v1/evoluciones`, {
        ...evolucion,
        diagnostico: JSON.stringify(enfermedades),
      });
      if (response.status == 201) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
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
    if (enfermedades.length === 0)
      setenfermedades(enfermedades.concat(subcategoria_escogida));
    else {
      if (!subcategoriaExiste(subcategoria_escogida))
        setenfermedades(enfermedades.concat(subcategoria_escogida));
    }
  };
  //Elimina la selección de una enfermedad
  const handleRemoveSubcategoria = (subcategoria_escogida) => {
    //
    setenfermedades(_.without(enfermedades, subcategoria_escogida));
  };
  //Maneja la busqueda de categorias por boton
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
  //Maneja la busqueda de categorias por enter
  const handleSearchCategoriasKey = async (event) => {
    if (event.key === 'Enter') {
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
    }
  };
  //Maneja la busqueda de subcategorias por boton
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
  //Maneja la busqueda de subcategorias por enter
  const handleSearchSubcategoriasKey = async (event) => {
    if (event.key === 'Enter') {
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
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <CrearEvolucion
        paciente={paciente}
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
        handleSearchCategoriasKey={handleSearchCategoriasKey}
        handleSearchSubcategoriasKey={handleSearchSubcategoriasKey}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='La evolución se ha creado satisfactoriamente!'
        redireccion={`/admin/paciente/historia/evoluciones/${paciente.paciente_id}`}
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Revise que los datos ingresados sean correctos!'
      />
    </AdminLayout>
  );
};

export default index;
