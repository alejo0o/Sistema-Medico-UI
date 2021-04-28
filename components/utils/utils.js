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
