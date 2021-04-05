import { mount } from 'enzyme';
import HistoriaClinica from '@/components/Admin/HistoriaClinica/HistoriaClinica';
import {
  historia_clinica,
  paciente,
} from '../../__mocks__/HistoriaClinicaMock';

describe('<AdminLayout></AdminLayout>', () => {
  const historiaClinica = mount(
    <HistoriaClinica
      handleModalDelete={() => {}}
      historia_clinica={historia_clinica}
      paciente={paciente}
    />
  ); //mount se encarga de montar el componente completo sobre el dom
  test('Render del componente que presenta la Historia Clinica de cada paciente', () => {
    expect(historiaClinica.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
});
