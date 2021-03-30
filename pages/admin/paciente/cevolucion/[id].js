import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import nProgress from 'nprogress';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import CrearEvolucion from '@/components/Admin/Forms/CrearEvolucion';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getServerSideProps = async ({ params }) => {
  const { data: historiaClinica } = await axios.get(
    `${process.env.apiURL}/historiaclinicapaciente/${params?.id}`
  );
  const { data: paciente } = await axios.get(
    `${process.env.apiURL}/pacientes/${params?.id}`
  );
  return {
    props: {
      paciente,
      historiaClinica,
    },
  };
};

const index = ({ paciente, historiaClinica }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [evolucion, setevolucion] = useState({
    //estado previo de la variable
    historia_clinica_id: historiaClinica.historia_clinica_id,
    fecha: '',
    motivo_consulta: '',
    fecha_ultima_menstruacion: '',
    procedimiento: '',
    tratamiento: '',
    proximo_control: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  const [categoriasQuery, setcategoriasQuery] = useState('');
  const [subcategoriasQuery, setsubcategoriasQuery] = useState('');
  const [categoriasResults, setcategoriasResults] = useState([]);
  const [subCategoriasRestuls, setsubCategoriasRestuls] = useState([]);
  /*---------------Queries para las busquedas------ */
  //Hook encargado de ejecutar los queries y usar la propiedad de memorize
  useMemo(() => {
    const fetchCategorias = async () => {
      const {
        data: { data: categorias },
      } = await axios.get(
        `${process.env.apiURL}/categoriascodigo/${categoriasQuery}`
      );
      setcategoriasResults(categorias);
    };
    const fetchSubcategorias = async () => {
      const {
        data: { data: subcategorias },
      } = await axios.get(
        `${process.env.apiURL}/subcategoriascodigo/${subcategoriasQuery}`
      );
      setsubCategoriasRestuls(subcategorias);
    };

    categoriasQuery.length >= 2 && categoriasQuery.length <= 4
      ? fetchCategorias()
      : setcategoriasResults([]);

    subcategoriasQuery.length == 3 || subcategoriasQuery == 4
      ? fetchSubcategorias()
      : setsubCategoriasRestuls([]);
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
    nProgress.start();
    try {
      const response = await axios.post(
        `${process.env.apiURL}/evoluciones`,
        evolucion
      );
      if (response.status == 201) {
        nProgress.done();
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      nProgress.done();
    }
  };
  //Maneja la busqueda de categorias por codigo
  const handleChangeCategoria = async (event) => {
    setcategoriasQuery(String(event.target.value).toUpperCase());
  };
  //Maneja la busqueda de subcategorias por codigo
  const handleChangeSubcategoria = async (event) => {
    setsubcategoriasQuery(String(event.target.value).toUpperCase());
  };
  //Maneja la seleccion de categoria hacia subcategoria
  const handleClickCategoria = (categoria_codigo) => {
    setsubcategoriasQuery(String(categoria_codigo).trim());
  };

  return (
    <AdminLayout>
      <CrearEvolucion
        paciente={paciente}
        handleSubmit={handleSubmit}
        handleaChange={handleChange}
        handleChangeCategoria={handleChangeCategoria}
        handleChangeSubcategoria={handleChangeSubcategoria}
        categoriasResults={categoriasResults}
        subCategoriasRestuls={subCategoriasRestuls}
        categoriasQuery={categoriasQuery}
        subcategoriasQuery={subcategoriasQuery}
        handleClickCategoria={handleClickCategoria}
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
