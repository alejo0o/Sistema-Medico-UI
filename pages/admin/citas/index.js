import { useState, useEffect, useMemo } from 'react';
import { allDays } from '@/components/utils/calendarData';
import { format, parseJSON } from 'date-fns';
//componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import Calendario from '@/components/Admin/CalendarioVariante/Calendario';
import VerCita from '@/components/Admin/Modales/VerCita';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import swrHook from '@/components/utils/useSWR-helper';
import NotificacionEnviada from '@/components/Admin/Modales/NotificacionEnviada';
import ModalError from '@/components/Admin/Modales/ModalError';
import { guardar_numero, get_fecha } from '@/components/utils/utils';

export const getServerSideProps = withSession(async ({ req, res }) => {
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
      user,
    },
  };
});

const index = ({ user }) => {
  /*---------------Variables de estado---------- */
  //Variables para el calendario
  const [selectedDate, setselectedDate] = useState(new Date());
  const [currentMonth, setcurrentMonth] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [errorNotificacion, seterrorNotificacion] = useState(null);
  const data = allDays(currentMonth); //extrae los dias en un solo arreglo
  //Variables para los modales
  const [modalInfoCita, setmodalInfoCita] = useState(false);
  const [citaInfo, setcitaInfo] = useState({
    fecha: '',
    hora: '',
    paciente_id: '',
    medico_id: '',
    motivo_cita: '',
    medico_correo: '',
    medico_numero: '',
    medico_nombres: '',
    medico_apellidos: '',
    paciente_nombres: '',
    paciente_apellidos: '',
    paciente_correo: '',
    paciente_numero: '',
  });
  const [modalEliminarCita, setmodalEliminarCita] = useState(false);
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalSuccessSMS, setmodalSuccessSMS] = useState(false);
  const [modalError, setmodalError] = useState(false);
  //-------------Props de la pagina--------------------//
  /*---------------Funciones del componente------- */

  const { data: citas, isLoading, isError } = swrHook(
    `/v1/citasxfecha/${format(selectedDate, 'PP')}`,
    user.token
  );

  const handleVerCitaClick = (cita) => {
    setcitaInfo(cita);
    setmodalInfoCita(true);
  };

  const handleClickEliminar = (cita) => {
    setcitaInfo(cita);
    setmodalEliminarCita(true);
  };

  const handleDeleteCita = async () => {
    try {
      const response = await axios(user.token).delete(
        `/v1/citas/${citaInfo.cita_id}`
      );
      if (response.status === 204) {
        setmodalEliminarCita(false);
        setselectedDate(new Date());
      }
    } catch (error) {
      seterror(error);
    }
  };

  //Envio de correos al paciente
  const handleSendEmailPaciente = async () => {
    if (citaInfo.paciente_correo) {
      //se comprueba un correo asociado
      setloading(true);
      try {
        const response = await axios(user.token).post(
          '/v1/enviarcitaconfirmacion',
          {
            correo: citaInfo.paciente_correo.toString().trim(),
            nombre_completo: `${String(
              citaInfo.paciente_nombres
            ).trim()} ${String(citaInfo.paciente_apellidos).trim()}`,
            hora: citaInfo.hora,
            //SE FORMATEA LA FECHA ENTENDIBLE PARA EL PACIENTE Y MÉDICO
            fecha: get_fecha(citaInfo.fecha),
            medico: `${String(citaInfo.medico_nombres).trim()} ${String(
              citaInfo.medico_apellidos
            ).trim()}`,
          }
        );
        if (response.status === 200) {
          setloading(false);
          setmodalSuccess(true);
        }
      } catch (error) {
        seterrorNotificacion('Error al envia el correo');
        setmodalError(true);
        setloading(false);
      }
    } else {
      setmodalError(true);
      seterrorNotificacion('El paciente no tiene un correo asociado.');
    }
  };
  //Envio de correos al médico
  const handleSendEmailMedico = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).post(
        '/v1/enviarcitaconfirmacion',
        {
          correo: citaInfo.medico_correo.toString().trim(),
          nombre_completo: `Dr. ${String(
            citaInfo.medico_nombres
          ).trim()} ${String(citaInfo.medico_apellidos).trim()}`,
          hora: citaInfo.hora,
          //SE FORMATEA LA FECHA ENTENDIBLE PARA EL PACIENTE Y MÉDICO
          fecha: get_fecha(citaInfo.fecha),
          medico: null,
        }
      );
      if (response.status === 200) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error) {
      seterrorNotificacion('Error al envia el correo');
      setmodalError(true);
      setloading(false);
    }
  };
  //Envio de sms  al paciente
  const handleSendSMSPaciente = async () => {
    if (citaInfo.paciente_numero) {
      setloading(true);
      try {
        const response = await axios(user.token).post(
          '/v1/enviarcitaconfirmacionsms',
          {
            telefono: guardar_numero(
              citaInfo.paciente_numero.toString().trim()
            ),
            nombre_completo: `${String(
              citaInfo.paciente_nombres
            ).trim()} ${String(citaInfo.paciente_apellidos).trim()}`,
            hora: citaInfo.hora,
            //SE FORMATEA LA FECHA ENTENDIBLE PARA EL PACIENTE Y MÉDICO
            fecha: get_fecha(citaInfo.fecha),
            medico: `${String(citaInfo.medico_nombres).trim()} ${String(
              citaInfo.medico_apellidos
            ).trim()}`,
          }
        );
        if (response.status === 200) {
          setloading(false);
          setmodalSuccessSMS(true);
        }
      } catch (error) {
        seterrorNotificacion('Error al envia el SMS');
        setmodalError(true);
        setloading(false);
      }
    } else {
      setmodalError(true);
      seterrorNotificacion('El paciente no tiene un celular asociado.');
    }
  };
  //Envio de sms al médico
  const handleSendSMSMedico = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).post(
        '/v1/enviarcitaconfirmacionsms',
        {
          telefono: guardar_numero(citaInfo.medico_numero.toString().trim()),
          nombre_completo: `Dr. ${String(
            citaInfo.medico_nombres
          ).trim()} ${String(citaInfo.medico_apellidos).trim()}`,
          hora: citaInfo.hora,
          //SE FORMATEA LA FECHA ENTENDIBLE PARA EL PACIENTE Y MÉDICO
          fecha: get_fecha(citaInfo.fecha),
          medico: null,
        }
      );
      if (response.status === 200) {
        setloading(false);
        setmodalSuccessSMS(true);
      }
    } catch (error) {
      seterrorNotificacion('Error al envia el SMS');

      setmodalError(true);
      setloading(false);
    }
  };

  return (
    <AdminLayout>
      <Calendario
        data={data}
        selectedDate={selectedDate}
        setselectedDate={setselectedDate}
        currentMonth={currentMonth}
        setcurrentMonth={setcurrentMonth}
        loading={isLoading}
        citasArreglo={citas}
        handleVerCitaClick={handleVerCitaClick}
        handleClickEliminar={handleClickEliminar}
      />
      {/*Modal a ver la información de las citas */}
      {modalInfoCita && (
        <VerCita
          show={modalInfoCita}
          handleClose={() => {
            setmodalInfoCita(false);
          }}
          cita={citaInfo}
          handleSendEmailPaciente={handleSendEmailPaciente}
          handleSendEmailMedico={handleSendEmailMedico}
          loading={loading}
          handleSendSMSPaciente={handleSendSMSPaciente}
          handleSendSMSMedico={handleSendSMSMedico}
        />
      )}
      {/*Modal para eliminar citas */}
      <ModalEliminar
        show={modalEliminarCita}
        handleClose={() => {
          setmodalEliminarCita(false);
        }}
        mensaje='Esta seguro que desea eliminar la cita?'
        handleDelete={handleDeleteCita}
        titulo='Eliminar'
      />
      {/*Modal success para el envio de correos */}
      <NotificacionEnviada
        handleClose={() => {
          setmodalSuccess(false);
        }}
        tituloMensaje='Correo enviado!'
        show={modalSuccess}
        mensaje='El correo se ha enviado satisfactoriamente'
      />
      {/*Modal success para el envio de SMS */}
      <NotificacionEnviada
        handleClose={() => {
          setmodalSuccessSMS(false);
        }}
        tituloMensaje='SMS enviado!'
        show={modalSuccessSMS}
        mensaje='El sms se ha enviado satisfactoriamente'
      />
      {/*Modal en caso de errores */}
      <ModalError
        handleClose={() => {
          setmodalError(false);
        }}
        show={modalError}
        tituloMensaje='Error'
        mensaje={errorNotificacion}
      />
    </AdminLayout>
  );
};

export default index;
