import { useState, useMemo, useEffect } from 'react';
import { LinearProgress, Switch } from '@material-ui/core';
import { Modal, Dropdown } from 'react-bootstrap';
//
import { Boton } from '@/components/CommonStyles/CommonStyles';
import axios from '@/components/utils/axios-helper';
import EditarCita from '@/components/Admin/Forms/EditarCita2';
import ModalSuccess from '@/components/Admin/Modales/ModalExito';
import ModalError from '@/components/Admin/Modales/ModalError';
import ErrorCreacion from '@/components/Admin/Modales/ModalError';

const index = ({
  cita,
  user,
  medicos,
  date,
  show,
  handleClose,
  loadingSend,
  handleClickEliminar,
  handleSendEmailPaciente,
  handleSendEmailMedico,
  handleSendSMSPaciente,
  handleSendSMSMedico,
}) => {
  /*---------------Variables de estado---------- */
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [pacientesQuery, setpacientesQuery] = useState('');
  const [pacientesResults, setpacientesResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [errorHora, seterrorHora] = useState(false); //en caso de que la cita sea a la misma hora
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
  const [pacienteSelect, setpacienteSelect] = useState('');
  const [toggleEdit, settoggleEdit] = useState(false);
  /*---------------Funciones del componente------- */
  useEffect(() => {
    setcitaEdit(cita);
    setpacienteSelect(
      `${cita.paciente_nombres.trim()} ${cita.paciente_apellidos.trim()}`
    );
  }, []);
  useMemo(() => {
    if (pacientesQuery.trim().length == 0) setpacientesResults([]);
  }, [pacientesQuery]);

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
    setcitaEdit({
      ...citaEdit,
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
        <Modal.Title className='mr-2'>Cita</Modal.Title>
        <Switch
          checked={toggleEdit}
          onChange={(event) => {
            settoggleEdit(event.target.checked);
          }}
          name='switch'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <Boton
          color='red'
          onClick={() => {
            handleClickEliminar(cita);
          }}>
          <i className='fas fa-trash-alt' />
        </Boton>
      </Modal.Header>
      <Modal.Body>
        {(loading || loadingSend) && <LinearProgress />}
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
          pacienteSelect={pacienteSelect}
          handleSearchPacienteKey={handleSearchPacienteKey}
          medicos={medicos}
          toggleEdit={toggleEdit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            Recordatorio de la Cita (Mail)
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSendEmailPaciente}>
              Recordatorio a paciente
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSendEmailMedico}>
              Recordatorio a médico
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant='info' id='dropdown-basic'>
            Recordatorio de la Cita (SMS)
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSendSMSPaciente}>
              Recordatorio a paciente
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSendSMSMedico}>
              Recordatorio a médico
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Boton variant='secondary' onClick={handleClose}>
          Cerrar
        </Boton>
      </Modal.Footer>
      {/*---------Modal de exito en la edición--- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => {
          setmodalSuccess(false);
        }}
        tituloMensaje='Edición exitosa!'
        mensaje='La cita se ha editado satisfactoriamente.'
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
    </Modal>
  );
};

export default index;
