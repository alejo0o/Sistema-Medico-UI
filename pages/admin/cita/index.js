import { useState, useMemo } from 'react';
import { LinearProgress } from '@material-ui/core';
//Componentes
import CrearCita from '@/components/Admin/Forms/CrearCita';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import ErrorCreacion from '@/components/Admin/Modales/ModalError';

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

    const { data: medicos } = await axios(user.token).get(`/v1/medicosall`);

    return {
      props: {
        page,
        user,
        medicos,
      },
    };
  }
);

const index = ({ user, medicos }) => {
  /*---------------Variables de estado---------- */
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [pacientesQuery, setpacientesQuery] = useState('');
  const [pacientesResults, setpacientesResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [errorHora, seterrorHora] = useState(false); //en caso de que la cita sea a la misma hora
  const [cita, setcita] = useState({
    paciente_id: '',
    medico_id: medicos[0] ? medicos[0].medico_id : '',
    fecha: '',
    hora: '07:00:00',
    motivo_cita: '',
    extra_info: '',
  });

  /*---------------Funciones del componente------- */
  useMemo(() => {
    if (pacientesQuery.trim().length == 0) setpacientesResults([]);
  }, [pacientesQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setloading(true);
    try {
      const response = await axios(user.token).post('/v1/crearcita', cita);
      if (response.status === 201) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      error_peticion.response.data.citaexiste
        ? seterrorHora(true)
        : setmodalError(true);
      seterror(error_peticion);
      setloading(false);
    }
  };
  const handleChange = (event) => {
    setcita({
      ...cita,
      [event.target.name]: event.target.value,
    });
  };
  //Busca el paciente por boton
  const handleSearchPaciente = async () => {
    if (pacientesQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: pacientes },
        } = await axios(user.token).get(
          `/v1/getpacientesbusqueda/${pacientesQuery}`
        );
        setpacientesResults(pacientes);
        setloading(false);
      } catch (error) {
        seterror(error);
        setloading(false);
      }
    } else {
      setpacientesResults([]);
    }
  };

  //Busca el paciente por Enter
  const handleSearchPacienteKey = async (event) => {
    if (event.key === 'Enter') {
      if (pacientesQuery.trim()) {
        setloading(true);
        try {
          const {
            data: { data: pacientes },
          } = await axios(user.token).get(
            `/v1/getpacientesbusqueda/${pacientesQuery}`
          );
          setpacientesResults(pacientes);
          setloading(false);
        } catch (error) {
          seterror(error);
          setloading(false);
        }
      } else {
        setpacientesResults([]);
      }
    }
  };

  const handleClickPaciente = (paciente_select) => {
    setcita({
      ...cita,
      paciente_id: paciente_select.paciente_id,
    });
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <CrearCita
        handleChangePacientesQuery={(event) => {
          setpacientesQuery(String(event.target.value));
        }}
        pacientesResults={pacientesResults}
        handleSubmit={handleSubmit}
        handleSearchPaciente={handleSearchPaciente}
        pacientesQuery={pacientesQuery}
        medicos={medicos}
        handleClickPaciente={handleClickPaciente}
        handleChange={handleChange}
        handleSearchPacienteKey={handleSearchPacienteKey}
      />
      {/*---------Modal de exito en la creación--- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => {
          setmodalSuccess(false);
        }}
        tituloMensaje='Creación exitosa!'
        mensaje='La cita se ha creado satisfactoriamente.'
        redireccion='/admin/citas'
      />
      {/*----------Modal de error en la creación ------ */}
      <ModalError
        show={modalError}
        handleClose={() => {
          setmodalError(false);
        }}
        tituloMensaje='Error!'
        mensaje='Revise los datos ingresados o contacte con el administrador.'
      />
      {/*----------Modal de error en la creación de citas en la misma hora ------ */}
      <ErrorCreacion
        show={errorHora}
        handleClose={() => {
          seterrorHora(false);
        }}
        tituloMensaje='Cita Cruzada!'
        mensaje='Ya existe otra cita, con el medico seleccionado, a la misma fecha y hora. Intenta con un horario diferente.'
      />
    </AdminLayout>
  );
};

export default index;
