import { mount } from 'enzyme';
import PacientesTable from '@/components/Admin/Tables/PacientesTable';
import pacientes from '../../__mocks__/PacientesMock';

describe('<AdminLayout></AdminLayout>', () => {
  const Table = mount(
    <PacientesTable
      pacientes={pacientes}
      handleModalDelete={() => {}}
      handleSearchPacientes={() => {}}
      handleShowInfo={() => {}}
      handleChangeQuery={() => {}}
      pacientesQuery=''
    />
  ); //mount se encarga de montar el componente completo sobre el dom
  test('Render del componente Pacientes Table con información', () => {
    expect(Table.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
});
