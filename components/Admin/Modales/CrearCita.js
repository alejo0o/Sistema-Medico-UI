import { useState, useMemo, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
//Componentes
import axios from '@/components/utils/axios-helper';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import CitaCrear from '@/components/Admin/Forms/CrearCita2';
import ModalSuccess from '@/components/Admin/Modales/ModalExito';
import ModalError from '@/components/Admin/Modales/ModalError';
import ErrorCreacion from '@/components/Admin/Modales/ModalError';

const CrearCita = ({ show, handleClose, user, date, medicos }) => {
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
  });
  const [pacienteSelect, setpacienteSelect] = useState('');

  /*---------------Funciones del componente------- */
  useEffect(() => {
    setcita({
      ...cita,
      fecha: date,
    });
  }, [show]);

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
        setcita({
          ...cita,
          paciente_id: '',
          medico_id: medicos[0] ? medicos[0].medico_id : '',
          fecha: date,
          hora: '07:00:00',
          motivo_cita: '',
        });
        setpacienteSelect('');
        setmodalSuccess(true);
      }
    } catch (error) {
      error.response.data.citaexiste ? seterrorHora(true) : setmodalError(true);
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
    setpacienteSelect(
      `${paciente_select.nombres
        .toString()
        .trim()} ${paciente_select.apellidos.toString().trim()}`
    );
  };

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <LinearProgress />}
        <CitaCrear
          handleChangePacientesQuery={(event) => {
            setpacientesQuery(String(event.target.value));
          }}
          pacientesResults={pacientesResults}
          handleSubmit={handleSubmit}
          handleSearchPaciente={handleSearchPaciente}
          pacientesQuery={pacientesQuery}
          handleClickPaciente={handleClickPaciente}
          handleChange={handleChange}
          handleSearchPacienteKey={handleSearchPacienteKey}
          medicos={medicos}
          cita={cita}
          date={date}
          pacienteSelect={pacienteSelect}
        />
      </Modal.Body>
      <Modal.Footer>
        <Boton variant='secondary' onClick={handleClose}>
          Cerrar
        </Boton>
      </Modal.Footer>
      {/*---------Modal de exito en la creación--- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => {
          setmodalSuccess(false);
        }}
        tituloMensaje='Creación exitosa!'
        mensaje='La cita se ha creado satisfactoriamente.'
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
    </Modal>
  );
};

export default CrearCita;
