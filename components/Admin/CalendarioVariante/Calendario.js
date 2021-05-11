import { useState } from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { Col, Row } from 'react-bootstrap';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import {
  MainContainer,
  CalendarContainer,
  InfoContainer,
  WeekHeader,
  Columns,
  DayContainer,
  DiaInfo,
  NotaCircle,
  CitasContainer,
  StyledCol,
} from '@/components/Admin/CalendarioVariante/CalendarioStyles';
import Header from '@/components/Admin/CalendarioVariante/CalendarioHeader';
import { CircularProgress } from '@material-ui/core';
import { Boton } from '@/components/CommonStyles/CommonStyles';

const Calendario = ({
  selectedDate,
  setselectedDate,
  data,
  loading,
  currentMonth,
  setcurrentMonth,
  citasArreglo,
  handleVerCitaClick,
  handleClickEliminar,
}) => {
  /*---------------Variables de estado---------- */

  /*------------Componentes de render------------- */
  const Weeks = () => (
    <>
      {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((dayName, i) => (
        <WeekHeader key={i}>{dayName}</WeekHeader>
      ))}
    </>
  );
  /*---------------Funciones del componente------- */

  //Pinta las fechas seleccionadas
  const dayColor = (day) => {
    if (!isSameMonth(day, selectedDate)) return 'text-info';
  };
  const daySelected = (day) => {
    if (isSameDay(day, selectedDate)) return '#00a6e8';
  };

  return (
    <div className='p-4'>
      <MainContainer>
        <InfoContainer className='p-3'>
          <DiaInfo>{format(selectedDate, 'dd')}</DiaInfo>
          <h3>{format(selectedDate, 'cccc', { locale: es })}</h3>
          <h5>Citas del día</h5>
          {loading ? (
            <CircularProgress color='primary' className='mt-4' />
          ) : (
            <CitasContainer>
              {citasArreglo.length === 0 ? (
                <h5>No hay citas</h5>
              ) : (
                citasArreglo.map((cita) => (
                  <Row
                    key={cita.cita_id}
                    className='pt-2 pb-2 align-items-center'
                    style={{
                      borderBottom: 'solid 1px blue',
                    }}>
                    <StyledCol
                      onClick={() => {
                        handleVerCitaClick(cita);
                      }}
                      className='d-flex align-items-center'
                      style={{
                        fontSize: '0.9em',
                      }}
                      color='#05445E'>
                      <NotaCircle className='mr-1' />
                      {`Dr. ${cita.medico_apellidos} - ${
                        cita.hora.split(':')[0]
                      }:${cita.hora.split(':')[1]}`}
                    </StyledCol>
                    <Link href={`/admin/cita/${cita.cita_id}`}>
                      <StyledCol md='auto' color='#003060'>
                        <i className='fas fa-edit' />
                      </StyledCol>
                    </Link>
                    <StyledCol
                      md='auto'
                      color='#DB1F48'
                      onClick={() => {
                        handleClickEliminar(cita);
                      }}>
                      <i className='fas fa-trash-alt' />
                    </StyledCol>
                  </Row>
                ))
              )}
            </CitasContainer>
          )}
          <div className='d-flex pt-3 pl-3 pr-3'>
            <h5 className='mr-3'>Agregar nueva Cita</h5>
            <Link href='/admin/cita'>
              <Boton color='blue-variant'>
                <i className='fas fa-plus-circle' />
              </Boton>
            </Link>
          </div>
        </InfoContainer>
        <CalendarContainer className='p-3'>
          <Header
            month={format(currentMonth, 'MMMM', { locale: es })}
            year={format(currentMonth, 'yyyy')}
            setcurrentMonth={setcurrentMonth}
            setselectedDate={setselectedDate}
            currentMonth={currentMonth}
          />
          <div className='d-flex h-100 pt-3 justify-content-center align-items-center'>
            <Columns>
              <Weeks />
              {data.map((day, i) => (
                <DayContainer
                  key={i}
                  onClick={() => {
                    setselectedDate(day);
                  }}
                  style={{
                    background: daySelected(day),
                  }}
                  className={`${dayColor(day)} rounded-circle`}>
                  {format(day, 'dd')}
                </DayContainer>
              ))}
            </Columns>
          </div>
        </CalendarContainer>
      </MainContainer>
    </div>
  );
};

export default Calendario;
