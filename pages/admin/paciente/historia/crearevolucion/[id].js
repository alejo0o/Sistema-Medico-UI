import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import nProgress from 'nprogress';
import _ from 'lodash';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import CrearEvolucion from '@/components/Admin/Forms/CrearEvolucion';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import { LinearProgress } from '@material-ui/core';

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
  useEffect(() => {
    setevolucion({
      ...evolucion,
      diagnostico: JSON.stringify(enfermedades),
    });
  }, [enfermedades]);

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
        } = await axios.get(
          `${process.env.apiURL}/categoriascodigo/${categoriasQuery}`
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
        } = await axios.get(
          `${process.env.apiURL}/subcategoriascodigo/${subcategoriasQuery}`
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
