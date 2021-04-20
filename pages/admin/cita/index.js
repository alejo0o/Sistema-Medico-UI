import { useState, useMemo } from 'react';
//Componentes
import CrearCita from '@/components/Admin/Forms/CrearCita';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

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

    return {
      props: {
        page,
        user,
      },
    };
  }
);

const index = ({ user }) => {
  /*---------------Variables de estado---------- */
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [pacientesQuery, setpacientesQuery] = useState('');
  const [medicosQuery, setmedicosQuery] = useState('');
  const [pacientesResults, setpacientesResults] = useState([]);
  const [medicosResults, setmedicosResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [cita, setcita] = useState({
    paciente_id: '',
    medico_id: '',
    fecha: '',
    hora: '',
    motivo_cita: '',
    extra_info: '',
  });

  /*---------------Funciones del componente------- */
  useMemo(() => {
    if (pacientesQuery.trim().length == 0) setpacientesResults([]);
    if (medicosQuery.trim().length == 0) setmedicosResults([]);
  }, [pacientesQuery, medicosQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setloading(true);
    try {
      const response = await axios(user.token).post('/v1/citas', cita);
      if (response.status === 201) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error) {
      setmodalError(true);
      seterror(error);
      setloading(false);
    }
  };
  const handleChange = (event) => {
    setcita({
      ...cita,
      [event.target.name]: event.target.value,
    });
  };

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
        console.log(error);
        seterror(error);
        setloading(false);
      }
    } else {
      setpacientesResults([]);
    }
  };

  const handleSearchMedicos = async () => {
    if (medicosQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { data: medicos },
        } = await axios(user.token).get(`/v1/medicosbusqueda/${medicosQuery}`);
        setmedicosResults(medicos);
        setloading(false);
      } catch (error) {
        console.log(error);
        seterror(error);
        setloading(false);
      }
    } else {
      setmedicosResults([]);
    }
  };

  const handleClickPaciente = (paciente_select) => {
    setcita({
      ...cita,
      paciente_id: paciente_select.paciente_id,
    });
  };
  const handleClickMedico = (medico_select) => {
    setcita({
      ...cita,
      medico_id: medico_select.medico_id,
    });
  };

  return (
    <AdminLayout>
      <CrearCita
        handleChangePacientesQuery={(event) => {
          setpacientesQuery(String(event.target.value));
        }}
        handleChangeMedicosQuery={(event) => {
          setmedicosQuery(String(event.target.value));
        }}
        pacientesResults={pacientesResults}
        handleSubmit={handleSubmit}
        handleSearchPaciente={handleSearchPaciente}
        pacientesQuery={pacientesQuery}
        medicosQuery={medicosQuery}
        medicosResults={medicosResults}
        handleSearchMedicos={handleSearchMedicos}
        handleClickPaciente={handleClickPaciente}
        handleClickMedico={handleClickMedico}
        handleChange={handleChange}
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
    </AdminLayout>
  );
};

export default index;
