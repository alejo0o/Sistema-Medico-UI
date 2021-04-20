import { useState, useEffect, useMemo } from 'react';
import { allDays } from '@/components/utils/calendarData';
import { format } from 'date-fns';

//componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import Calendario from '@/components/Admin/CalendarioVariante/Calendario';
import VerCita from '@/components/Admin/Modales/VerCita';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import swrHook from '@/components/utils/useSWR-helper';

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
  const data = allDays(currentMonth); //extrae los dias en un solo arreglo
  //Variables para los modales
  const [modalInfoCita, setmodalInfoCita] = useState(false);
  const [citaInfo, setcitaInfo] = useState({
    fecha: '',
    hora: '',
    paciente_id: '',
    medico_id: '',
    motivo_cita: '',
    medico_nombres: '',
    medico_apellidos: '',
    paciente_nombres: '',
    paciente_apellidos: '',
  });
  const [modalEliminarCita, setmodalEliminarCita] = useState(false);
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
    </AdminLayout>
  );
};

export default index;
