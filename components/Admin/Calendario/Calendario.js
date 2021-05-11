import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useMediaQuery, Divider } from '@material-ui/core';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { allDays } from '@/components/utils/calendarData';
import {
  CalendarContainer,
  Columns,
  DayContainer,
  WeekHeader,
} from '@/components/Admin/Calendario/CalendarioStyles';
import Header from '@/components/Admin/Calendario/CalendarioHeader';
import NotaCita from '@/components/Admin/Calendario/NotaCita';
import Loader from '@/components/Loader/Loader';
import { es } from 'date-fns/locale';

const Calendario = ({
  citas,
  loading,
  handleVerCitaClick,
  handleCrearCitaClick,
  selectedDate,
  setselectedDate,
  currentMonth,
  setcurrentMonth,
}) => {
  /*---------------Variables de estado---------- */

  const data = allDays(currentMonth); //extrae los dias en un solo arreglo
  const matches = useMediaQuery('(max-width: 1264px)');

  /*------------Componentes de render------------- */

  const Weeks = () => (
    <>
      {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((dayName, i) => (
        <WeekHeader key={i}>{dayName}</WeekHeader>
      ))}
    </>
  );
  /*---------------Funciones del componente------- */
  const notSameMonth = (day) => {
    if (!isSameMonth(day, selectedDate)) return 'text-primary';
  };

  const dayColor = (day) => {
    if (isSameDay(day, selectedDate))
      return {
        border: 'ridge',
        borderWidth: '5px',
        borderImage: 'radial-gradient(#003060, #42C3F7) 1',
      };
  };

  return (
    <div className='p-3'>
      <CalendarContainer>
        <Header
          month={format(currentMonth, 'MMMM', { locale: es }).toUpperCase()}
          year={format(currentMonth, 'yyyy')}
          setcurrentMonth={setcurrentMonth}
          setselectedDate={setselectedDate}
          currentMonth={currentMonth}
        />
        <Columns>
          {matches ? <></> : <Weeks />}
          {data.map((day, i) => (
            <DayContainer
              key={i}
              style={dayColor(day)}
              className={`${notSameMonth(day)}`}
              onClick={() => {
                setselectedDate(day);
                handleCrearCitaClick();
              }}>
              <div className='d-flex'>
                <Col className='mb-1'>{format(day, 'dd')}</Col>

                {matches ? (
                  <Col className='mb-1'>{format(day, 'E')}</Col>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  citas.map((cita) =>
                    format(new Date(cita.fecha), 'P') === format(day, 'P') ? (
                      <div
                        key={cita.cita_id}
                        onClick={(event) => {
                          handleVerCitaClick(cita);
                          event.stopPropagation();
                        }}
                        className='p-1'>
                        <NotaCita
                          doctor={`Dr(a). ${cita.medico_apellidos}`}
                          hora={`${cita.hora.split(':')[0]}:${
                            cita.hora.split(':')[1]
                          }`}
                        />
                        <Divider />
                      </div>
                    ) : (
                      <div key={cita.cita_id} />
                    )
                  )
                )}
              </div>
            </DayContainer>
          ))}
        </Columns>
      </CalendarContainer>
    </div>
  );
};

export default Calendario;
