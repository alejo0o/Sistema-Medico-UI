import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { NavStyle, Styled_link, SideNavImg } from './SideNavStyles';
import useWindowSize from '@/components/Admin/Hooks/useWindowSize';

const SideNav = () => {
  const [height, width] = useWindowSize();

  return (
    <Nav defaultActiveKey='/home' className='flex-column' style={NavStyle}>
      <Nav.Item className='mb-5'>
        <SideNavImg>
          <img
            className='w-100 h-100'
            alt=''
            src='https://www.pngitem.com/pimgs/m/226-2261747_company-name-icon-png-transparent-png.png'
          />
        </SideNavImg>
      </Nav.Item>
      <Link href='/admin/pacientes'>
        <Styled_link className='mb-3 p-2' style={{ textDecoration: 'none' }}>
          <i className='fas fa-users mr-2'></i>
          Pacientes
        </Styled_link>
      </Link>
      <div>{height}</div>
      <div>{width}</div>
    </Nav>
  );
};

export default SideNav;
