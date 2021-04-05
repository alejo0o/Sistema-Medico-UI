export const getEdad = (fecha) => {
  const edad = new Date().getFullYear() - fecha.split('-')[0];
  return edad;
};
