import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Hidden from '@material-ui/core/Hidden';
import { NavButton } from './NavBarStyles';

const NavBar = ({ router }) => {
  return (
    <Navbar expand='lg' style={{ background: '#00A5E9' }}>
      <Nav.Item>
        <Hidden only={['md', 'lg', 'xl']}>
          <i className='fas fa-bars' style={{ fontSize: '1.2em' }} />
        </Hidden>
        <Link href='/'>
          <a className='navbar-brand ml-2'>
            <strong> Company Name</strong>
          </a>
        </Link>
      </Nav.Item>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <NavButton
            variant='light'
            onClick={() => {
              router.back();
            }}>
            <i className='fas fa-arrow-circle-left' /> Regresar
          </NavButton>

          <Link href='/'>
            <a className='btn btn-light'>
              Log Out <i className='fas fa-sign-out-alt' />
            </a>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
