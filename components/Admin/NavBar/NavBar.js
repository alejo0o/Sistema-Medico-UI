import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const NavBar = () => {
  return (
    <Navbar expand='lg' style={{ background: '#00A5E9' }}>
      <Link href='/'>
        <a className='navbar-brand'>
          <strong> Company Name</strong>
        </a>
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Link href='/'>
            <a className='btn btn-light'>Log Out</a>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
