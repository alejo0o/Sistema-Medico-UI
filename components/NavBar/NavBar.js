import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { NavBarItem, StyledDropToggle } from './NavBarStyles';

const NavBar = ({ color, user }) => {
  const matches = useMediaQuery('(max-width:991px)');
  const handleLogout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        if (response.status == 200) window.location.replace('/');
      })
      .catch((error) => {});
  };

  return (
    <Navbar
      variant='dark'
      className={`${matches ? 'pr-0' : 'pr-5'}`}
      style={{ background: color }}
      expand='lg'>
      <Nav.Item>
        <Link href='/'>
          <Navbar.Brand style={{ cursor: 'pointer' }}>
            <img
              alt=''
              src='/company.png'
              width='60'
              height='60'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
        </Link>
      </Nav.Item>
      <Navbar.Toggle aria-controls='basic-navbar-nav' className='mr-2' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className={`ml-auto ${matches ? 'pr-3' : 'pr-5 mr-5'}`}>
          <Link href='/servicios'>
            <NavBarItem
              className={`${matches ? 'mb-0' : 'mr-5'} btn`}
              variant='light'>
              Servicios <i className='fas fa-notes-medical' />
            </NavBarItem>
          </Link>
          {user.isLoggedIn ? (
            <Dropdown>
              <StyledDropToggle
                color={color}
                id='dropdown-basic'
                className='w-100'>
                <i className='fas fa-hospital-user' /> {user.username}
              </StyledDropToggle>

              <Dropdown.Menu>
                <Link href='/admin/pacientes'>
                  <a className='dropdown-item'>
                    <i className='fas fa-users' /> Pacientes
                  </a>
                </Link>
                <Link href='/admin/citas'>
                  <a className='dropdown-item'>
                    <i className='fas fa-calendar-check' /> Citas
                  </a>
                </Link>
                <Link href='/'>
                  <a className='dropdown-item'>
                    <i className='fas fa-user-circle' /> Perfil
                  </a>
                </Link>
                <a
                  className='dropdown-item'
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}>
                  <i className='fas fa-sign-out-alt' /> Log Out
                </a>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link href='/login'>
              <NavBarItem className={`${matches ? 'mb-2' : 'mr-2'} btn`}>
                Log In <i className='fas fa-sign-in-alt' />
              </NavBarItem>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
