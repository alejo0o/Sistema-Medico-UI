import { useMediaQuery } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

const TextoImagen = ({ servicio }) => {
  const matches = useMediaQuery('(max-width:768px)');
  return (
    <Row
      className={`${
        matches ? 'pr-0 pl-0 justify-content-center' : 'pr-5 pl-5'
      } pt-3 pb-3 w-100 text-white`}>
      <Col
        sm={matches ? '8' : '6'}
        className={`pt-2 pl-5 text-align-justify`}
        style={{ textAlignLast: matches ? 'center' : '' }}>
        {matches ? <h3>{servicio.titulo}</h3> : <h2>{servicio.titulo}</h2>}
        <p>{servicio.descripcion}</p>
      </Col>
      <Col
        sm={matches ? '8' : '6'}
        className='h-50 d-flex justify-content-center'>
        <img
          style={{ width: '60%' }}
          src={servicio.imagen}
          alt={servicio.titulo}
        />
      </Col>
    </Row>
  );
};

export default TextoImagen;
