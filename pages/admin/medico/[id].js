import { useState, useMemo, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import _ from 'lodash';
//Componentes
import EditMedico from '@/components/Admin/Forms/EditMedico';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
//Auth
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';

export const getServerSideProps = withSession(async ({ query, req, res }) => {
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

  const { data: medico } = await axios(user.token).get(
    `/v1/medicos/${query.id}`
  );
  //Revisa que exista un medico caso contrario 404
  if (!medico)
    return {
      notFound: true,
    };
  //Retira los espacios en blanco
  Object.keys(medico).forEach(function (key) {
    medico[key] = medico[key] == null ? '' : String(medico[key]).trim();
  });

  return {
    props: {
      user,
      medico,
    },
  };
});

const index = ({ user, medico }) => {
  //-----Variables de estado de la página-----//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  const [especialidaesQuery, setespecialidaesQuery] = useState('');
  const [especialidadesResults, setespecialidadesResults] = useState([]); //para la busqueda de especialidades
  const [especialidades, setespecialidades] = useState([]); //manejo de las especialidades agregadas y retiradas

  //-----Funciones de la página---------//
  //Setea los valores iniciales de las especialides del médico
  useEffect(() => {
    const dict_especialidades = JSON.parse(medico.especialidades);
    const especialidades_array = [];
    for (var key in dict_especialidades) {
      especialidades_array.push({
        especialidad_id: key,
        especialidad: dict_especialidades[key],
      });
    }
    setespecialidades(especialidades_array);
  }, []);
  //Si el query esta vacio se vacia el arreglo
  useMemo(() => {
    if (especialidaesQuery.trim().length === 0) setespecialidadesResults([]);
  }, [especialidaesQuery]);
  //Extrae los valores del arreglo de especialidades a un objeto
  const getEspecialidadesValues = (especialidades_array) => {
    const dict_especialidades = {};
    especialidades_array.forEach(({ especialidad_id, especialidad }) => {
      dict_especialidades[especialidad_id] = especialidad.toString().trim();
    });
    return JSON.stringify(dict_especialidades);
  };
  //Buscar especialidades por boton
  const handleSearchEspecialidades = async () => {
    if (especialidaesQuery.trim() != 0) {
      setloading(true);
      try {
        const {
          data: { data: especialidades_results },
        } = await axios(user.token).get(
          `/v1/especialidadbuscar/${especialidaesQuery}`
        );
        setespecialidadesResults(especialidades_results);
        setloading(false);
      } catch (error_peiticion) {
        seterror(error_peiticion);
        setloading(false);
      }
    }
  };
  //Buscar especialidades por enter key
  const handleSearchEspecialidadesKey = async (event) => {
    if (especialidaesQuery.trim() != 0) {
      if (event.keyCode === 13) {
        setloading(true);
        try {
          const {
            data: { data: especialidades_results },
          } = await axios(user.token).get(
            `/v1/especialidadbuscar/${especialidaesQuery}`
          );
          setespecialidadesResults(especialidades_results);
          setloading(false);
        } catch (error_peiticion) {
          seterror(error_peiticion);
          setloading(false);
        }
      }
    }
  };
  //Revisa si un elemento ya esta en las especialidades usando LODASH
  const especialidadExiste = (elemento) => {
    if (
      _.find(
        especialidades,
        (especialidad) =>
          especialidad.especialidad_id == elemento.especialidad_id
      )
    )
      return true;
    else return false;
  };
  //Agrega la especialidad al arreglo
  const handleClickEspecialidad = (especialidad_escogida) => {
    if (especialidades.length === 0)
      setespecialidades(especialidades.concat(especialidad_escogida));
    else {
      if (!especialidadExiste(especialidad_escogida))
        setespecialidades(especialidades.concat(especialidad_escogida));
    }
  };
  //Se encarga de realizar el post del médico
  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).put(
        `/v1/medicos/${medico.medico_id}`,
        {
          ...values,
          especialidades: getEspecialidadesValues(especialidades),
        }
      );
      if (response.status === 200) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
    }
  };
  //Remueve la especialidad del arreglo
  const handleRemoveEspecialidad = (especialidad_escogida) => {
    setespecialidades(_.without(especialidades, especialidad_escogida));
  };
  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EditMedico
        especialidadesResults={especialidadesResults}
        especialidaesQuery={especialidaesQuery}
        handleChangeEspecialidadesQuery={(event) => {
          setespecialidaesQuery(String(event.target.value));
        }}
        handleClickEspecialidad={handleClickEspecialidad}
        handleSearchEspecialidades={handleSearchEspecialidades}
        handleSearchEspecialidadesKey={handleSearchEspecialidadesKey}
        medico={medico}
        handleSubmit={handleSubmit}
        especialidades={especialidades}
        handleRemoveEspecialidad={handleRemoveEspecialidad}
        medico={medico}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='El médico se ha editado satisfactoriamente!'
        redireccion='/admin/medicos'
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
