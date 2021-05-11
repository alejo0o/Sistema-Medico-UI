import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useSWR from 'swr';
import axios from '@/components/utils/axios-helper';

export const getEdad = (fecha) => {
  const edad = new Date().getFullYear() - fecha.split('-')[0];
  return edad;
};

export const guardar_numero = (numero) => {
  if (numero[0] === '0') numero = numero.substr(1, numero.length);
  if (numero.substr(0, 4) != '+593') numero = `+593${numero}`;
  return numero;
};
//Ayuda a formatear el numero telefonico para enviar el SMS
export const extraer_numero = (numero) => {
  if (numero.substr(0, 4) === '+593') numero = numero.substr(4, numero.length);
  if (numero[0] != '0') numero = `0${numero}`;
  return numero;
};
//Facilita el formateo de la fecha para la citas usando date-fns
export const get_fecha = (fecha) => {
  return `${format(new Date(fecha), 'EEEE', {
    locale: es,
  })} ${format(new Date(fecha), 'dd')} de ${format(new Date(fecha), 'LLLL', {
    locale: es,
  })}, del ${format(new Date(fecha), 'Y')}`;
};
/*Determina la instancia de un usuario para poder hacer la peticion al url enviado */
const fetchWithToken = (url, token) =>
  axios(token)
    .get(url)
    .then((res) => res.data);

export const swrHook = (url, user) => {
  const { data, error } = useSWR(
    () => (user ? (user.isLoggedIn ? [url, user.token] : null) : null),
    fetchWithToken
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const swrRevalidateHook = (url, token) => {
  const { data, error } = useSWR(
    () => (token ? [url, token] : null),
    fetchWithToken,
    { refreshInterval: 1000 }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

//Elementos para el select de la fecha
export const objeto_horas = {
  '07:00:00': '07:00-07:30 am',
  '07:30:00': '07:30-08:00 am',
  '08:00:00': '08:00-08:30 am',
  '08:30:00': '08:30-09:00 am',
  '09:00:00': '09:00-09:30 am',
  '09:30:00': '09:30-10:00 am',
  '10:00:00': '10:00-10:30 am',
  '10:30:00': '10:30-11:00 am',
  '11:00:00': '11:00-11:30 am',
  '11:30:00': '11:30-12:00 am',
  '12:00:00': '12:00-12:30 pm',
  '12:30:00': '12:30-13:00 pm',
  '13:00:00': '13:00-13:30 pm',
  '13:30:00': '13:30-14:00 pm',
  '14:00:00': '14:00-14:30 pm',
  '14:30:00': '14:30-15:00 pm',
  '15:00:00': '15:00-15:30 pm',
  '15:30:00': '15:30-16:00 pm',
  '16:00:00': '16:00-16:30 pm',
  '16:30:00': '16:30-17:00 pm',
  '17:00:00': '17:00-17:30 pm',
  '17:30:00': '17:30-18:00 pm',
  '18:00:00': '18:00-18:30 pm',
  '18:30:00': '18:30-19:00 pm',
  '19:00:00': '19:00-19:30 pm',
  '19:30:00': '19:30-20:00 pm',
  '20:00:00': '20:00-20:30 pm',
  '20:30:00': '20:30-21:00 pm',
  '21:00:00': '21:00-21:30 pm',
  '21:30:00': '21:30-22:00 pm',
};

//Extrae la cita en formato pgsql
export const parseFechaPgsql = (fecha) => {
  return `${format(fecha, 'yyyy')}-${format(fecha, 'MM')}-${format(
    fecha,
    'dd'
  )}`;
};
