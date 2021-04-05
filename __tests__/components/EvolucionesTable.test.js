import { mount } from 'enzyme';
import EvolucionesTable from '@/components/Admin/Tables/EvolucionesMUI';
import { evoluciones, paciente } from '../../__mocks__/EvolucionesMock';

describe('<EvolucionesTable></EvolucionesTable>', () => {
  const Table = mount(
    <EvolucionesTable
      evoluciones={evoluciones}
      handleModalDelete={() => {}}
      handleShowInfo={() => {}}
      paciente={paciente}
    />
  ); //mount se encarga de montar el componente completo sobre el dom
  test('Render del componente Evoluciones Table con información', () => {
    expect(Table.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
});
