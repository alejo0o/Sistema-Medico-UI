import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useMediaQuery, Divider } from '@material-ui/core';
import { format, isSameDay } from 'date-fns';
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

const Calendario = ({ citas, loading, handleVerCitaClick }) => {
  /*---------------Variables de estado---------- */
  const [selectedDate, setselectedDate] = useState(new Date());
  const [currentMonth, setcurrentMonth] = useState(new Date());
  const data = allDays(currentMonth); //extrae los dias en un solo arreglo
  const matches = useMediaQuery('(max-width: 1264px)');

  /*------------Componentes de render------------- */

  const Weeks = () => (
    <>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, i) => (
        <WeekHeader key={i}>{dayName}</WeekHeader>
      ))}
    </>
  );
  /*---------------Funciones del componente------- */
  const dayColor = (day) => {
    //if (!isSameMonth(day, selectedDate)) return 'text-info';
    if (isSameDay(day, selectedDate))
      return {
        background: '#63a4ff',
        backgroundImage: 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)',
      };
  };

  return (
    <div className='p-3'>
      <CalendarContainer>
        <Header
          month={format(currentMonth, 'MMMM')}
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
              onClick={() => setselectedDate(day)}>
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
                        onClick={() => {
                          handleVerCitaClick(cita);
                        }}>
                        <NotaCita
                          doctor={`Dr. ${cita.medico_apellidos}`}
                          hora={cita.hora}
                          color={cita.extra_info}
                        />
                        <Divider />
                      </div>
                    ) : (
                      <div key={cita.cita_id}></div>
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
