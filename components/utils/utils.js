import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const getEdad = (fecha) => {
  const edad = new Date().getFullYear() - fecha.split('-')[0];
  return edad;
};

export const guardar_numero = (numero) => {
  if (numero[0] === '0') numero = numero.substr(1, numero.length);
  if (numero.substr(0, 4) != '+593') numero = `+593${numero}`;
  return numero;
};

export const extraer_numero = (numero) => {
  if (numero.substr(0, 4) === '+593') numero = numero.substr(4, numero.length);
  if (numero[0] != '0') numero = `0${numero}`;
  return numero;
};

export const get_fecha = (fecha) => {
  return `${format(new Date(fecha), 'EEEE', {
    locale: es,
  })} ${format(new Date(fecha), 'dd')} de ${format(new Date(fecha), 'LLLL', {
    locale: es,
  })}, del ${format(new Date(fecha), 'Y')}`;
};
