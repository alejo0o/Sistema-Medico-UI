import { useState, useMemo, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
//
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import EditarCita from '@/components/Admin/Forms/EditarCita';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import ErrorCreacion from '@/components/Admin/Modales/ModalError';

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
  const { data: cita } = await axios(user.token).get(`/v1/citas/${query.id}`);

  const { data: medicos } = await axios(user.token).get(`/v1/medicosall`);

  return {
    props: {
      user,
      cita,
      medicos,
    },
  };
});

const index = ({ cita, user, medicos }) => {
  /*---------------Variables de estado---------- */
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [pacientesQuery, setpacientesQuery] = useState('');
  const [medicosQuery, setmedicosQuery] = useState('');
  const [pacientesResults, setpacientesResults] = useState([]);
  const [medicosResults, setmedicosResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [errorHora, seterrorHora] = useState(false); //en caso de que la cita sea a la misma hora
  const [citaEdit, setcitaEdit] = useState({
    paciente_id: '',
    medico_id: medicos[0] ? medicos[0].medico_id : '',
    fecha: '',
    hora: '07:00:00',
    motivo_cita: '',
    extra_info: '',
    paciente_nombres: '',
    paciente_apellidos: '',
    medico_nombres: '',
    medico_apellidos: '',
  });

  /*---------------Funciones del componente------- */
  useEffect(() => {
    setcitaEdit(cita);
  }, []);
  useMemo(() => {
    if (pacientesQuery.trim().length == 0) setpacientesResults([]);
    if (medicosQuery.trim().length == 0) setmedicosResults([]);
  }, [pacientesQuery, medicosQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setloading(true);
    try {
      const response = await axios(user.token).put(
        `/v1/editarcita/${citaEdit.cita_id}`,
        citaEdit
      );
      if (response.status === 200) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error) {
      error.response.data.citaexiste ? seterrorHora(true) : setmodalError(true);
      seterror(error);
      setloading(false);
    }
  };
  const handleChange = (event) => {
    setcitaEdit({
      ...citaEdit,
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
    setcitaEdit({
      ...citaEdit,
      paciente_id: paciente_select.paciente_id,
    });
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EditarCita
        cita={citaEdit}
        handleChangePacientesQuery={(event) => {
          setpacientesQuery(String(event.target.value));
        }}
        pacientesResults={pacientesResults}
        handleSubmit={handleSubmit}
        handleSearchPaciente={handleSearchPaciente}
        pacientesQuery={pacientesQuery}
        handleClickPaciente={handleClickPaciente}
        handleChange={handleChange}
        medicos={medicos}
        handleSearchPacienteKey={handleSearchPacienteKey}
      />
      {/*---------Modal de exito en la edición--- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => {
          setmodalSuccess(false);
        }}
        tituloMensaje='Edición exitosa!'
        mensaje='La cita se ha editado satisfactoriamente.'
        redireccion='/admin/citas'
      />
      {/*----------Modal de error en la edición ------ */}
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
