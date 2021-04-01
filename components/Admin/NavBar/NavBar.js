import { Navbar, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import { withRouter } from 'next/router';
//Material
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const NavBar = ({ router, handleDrawerToggle }) => {
  const matches = useMediaQuery('(max-width:991px)');
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
            <strong> Company Name</strong>
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
