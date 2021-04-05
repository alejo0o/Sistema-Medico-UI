import { mount } from 'enzyme';
import AdminLayout from '@/components/Layouts/AdminLayout';

describe('<AdminLayout></AdminLayout>', () => {
  const Admin = mount(
    <AdminLayout>
      <div></div>
    </AdminLayout>
  ); //mount se encarga de montar el componente completo sobre el dom
  test('Render del componente AdminLayout como wrapper', () => {
    expect(Admin.length).toEqual(1); //si la funcion mount logro montar el componente retorna 1 caso contrario 0
  });
});
