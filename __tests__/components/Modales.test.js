import { mount } from 'enzyme';
import InfoEvolucion from '@/components/Admin/Modales/InfoEvolucion';
import InfoPaciente from '@/components/Admin/Modales/InfoPaciente';
import ModalEliminar from '@/components/Admin/Modales/ModalEliminar';
import ModalError from '@/components/Admin/Modales/ModalError';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
//Mocks
import { evolucion, paciente, getEdad } from '../../__mocks__/ModalesMock';

describe('Prueba de todos los modales', () => {
  const informacion_evolucion = mount(
    <InfoEvolucion
      show={true}
      evolucion={evolucion}
      paciente={paciente}
      handleClose={() => {}}
    />
  ); //mount se encarga de montar el componente completo sobre el dom
  const informacion_paciente = mount(
    <InfoPaciente
      getEdad={getEdad}
      handleClose={() => {}}
      historia_clinica={true}
      paciente={paciente}
      show={true}
    />
  );
  const modal_eliminar = mount(
    <ModalEliminar
      show={true}
      handleClose={() => {}}
      handleDelete={() => {}}
      mensaje='Probando modal eliminar'
      titulo='Prueba'
    />
  );
  const modal_error = mount(
    <ModalError
      show={true}
      handleClose={() => {}}
      mensaje='Probando modal de error'
      tituloMensaje='Prueba'
    />
  );
  const modal_success = mount(
    <ModalSuccess
      show={true}
      handleClose={() => {}}
      mensaje='Prueba del modal de éxito'
      redireccion='/'
      tituloMensaje='Prueba'
    />
  );
  test('Render del modal Información de la Evolución', () => {
    expect(informacion_evolucion.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
  test('Render del modal Información del Paciente', () => {
    expect(informacion_paciente.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
  test('Render del modal de Eliminación', () => {
    expect(modal_eliminar.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
  test('Render del modal de Error', () => {
    expect(modal_error.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
  test('Render del modal de Éxito', () => {
    expect(modal_success.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
});
