import { useMediaQuery } from '@material-ui/core';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledIcon = styled.i`
  color: #fff;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #003060;
  }
`;

const Footer = ({ consultorio }) => {
  //Media Queries para el responsive design
  const matches = useMediaQuery('(max-width: 768px)');
  const small_screen = useMediaQuery('(max-width: 568px)');
  //Variables destructuradas del objeto consultorio
  const { nombre, correo, red_social1, red_social2 } = consultorio;

  return (
    <div
      className={`${small_screen ? 'd-block ml-auto' : 'd-flex'} pl-4`}
      style={{ background: '#39addb', minHeight: '8vh', maxHeight: 'auto' }}>
      <div className='d-flex align-items-center text-white'>
        <i className='far fa-copyright mr-3' />
        <span>Copyright 2021 {nombre}. Todos los derechos reservados.</span>
      </div>
      <div
        className={`d-flex align-items-center ml-auto ${
          matches ? 'pr-0 justify-content-center' : 'pr-5'
        }`}
        style={{ fontSize: '2em' }}>
        <Col>
          <a href={red_social1} rel='noreferrer' target='_blank'>
            <StyledIcon className='fab fa-facebook' />
          </a>
        </Col>
        <Col className={`${matches ? 'ml-0' : 'ml-5'}`}>
          <a href={red_social2} rel='noreferrer' target='_blank'>
            <StyledIcon className='fab fa-instagram' />
          </a>
        </Col>
        <Col className={`${matches ? 'ml-0' : 'ml-5'}`}>
          <a
            rel='noreferrer'
            target='_blank'
            href={`mailto:${correo
              .toString()
              .trim()}?subject=Saludos%20${nombre
              .toString()
              .trim()}!&amp;body=Buenos%20días%20%0A%0A`}>
            <StyledIcon className='fas fa-envelope' />
          </a>
        </Col>
      </div>
    </div>
  );
};

export default Footer;
