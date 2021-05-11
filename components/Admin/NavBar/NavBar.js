import { Navbar, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import { withRouter } from 'next/router';
import axios from 'axios';
//Material
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const NavBar = ({ router, handleDrawerToggle, consultorio_nombre }) => {
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
    <Navbar expand='lg' style={{ background: '#00A5E9' }} sticky='top'>
      <Nav.Item>
        {matches ? (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <Link href='/'>
          <a className='navbar-brand ml-2'>
            <strong>{consultorio_nombre}</strong>
          </a>
        </Link>
      </Nav.Item>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Button
            className={matches ? 'mb-2' : 'mr-2'}
            variant='light'
            onClick={() => {
              router.back();
            }}>
            <i className='fas fa-arrow-circle-left' /> Regresar
          </Button>

          <Button variant='light' onClick={handleLogout}>
            Log Out <i className='fas fa-sign-out-alt' />
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
