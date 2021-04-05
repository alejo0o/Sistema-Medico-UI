export const evolucion = {
  historia_clinica_id: 1,
  fecha: '07-12-1999',
  motivo_consulta: 'Dolor de cabeza',
  fecha_ultima_menstruacion: '',
  procedimiento: 'Exámenes',
  diagnostico: '[]',
  tratamiento: 'Cirugía',
  proximo_control: '07-12-2010',
};
export const paciente = {
  tipo_de_sangre_id: '1',
  estado_civil_id: '1',
  nivel_de_instruccion_id: '1',
  etnia_id: '1',
  genero_id: '1',
  apellidos: 'Vivanco Mosquera',
  cedula: '123456',
  contacto_emergencia_nombre: 'Edgar',
  contacto_emergencia_telefono: '09212',
  direccion: 'Tumbaco',
  fechanacimiento: '07-27-1998',
  lugarnacimiento: 'Quito',
  nombres: 'Alejandro Manuel',
  numero_hijos: '0',
  ocupacion: 'Ingeniro de Software',
  telefono: '09232',
};
export const getEdad = (fecha) => {
  const edad = new Date().getFullYear() - fecha.split('-')[0];
  return edad;
};
