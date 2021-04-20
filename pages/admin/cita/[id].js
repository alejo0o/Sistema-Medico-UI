import { useState, useMemo, useEffect } from 'react';
//
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import EditarCita from '@/components/Admin/Forms/EditarCita';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
import { LinearProgress } from '@material-ui/core';

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

  return {
    props: {
      user,
      cita,
    },
  };
});

const index = ({ cita, user }) => {
  /*---------------Variables de estado---------- */
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [pacientesQuery, setpacientesQuery] = useState('');
  const [medicosQuery, setmedicosQuery] = useState('');
  const [pacientesResults, setpacientesResults] = useState([]);
  const [medicosResults, setmedicosResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [citaEdit, setcitaEdit] = useState({
    paciente_id: '',
    medico_id: '',
    fecha: '',
    hora: '',
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
        `/v1/citas/${citaEdit.cita_id}`,
        citaEdit
      );
      if (response.status === 200) {
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
        seterror(error);
        setloading(false);
      }
    } else {
      setmedicosResults([]);
    }
  };

  const handleClickPaciente = (paciente_select) => {
    setcitaEdit({
      ...citaEdit,
      paciente_id: paciente_select.paciente_id,
    });
  };
  const handleClickMedico = (medico_select) => {
    setcitaEdit({
      ...citaEdit,
      medico_id: medico_select.medico_id,
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
    </AdminLayout>
  );
};

export default index;
