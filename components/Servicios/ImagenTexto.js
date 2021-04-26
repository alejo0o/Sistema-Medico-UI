import { Row, Col } from 'react-bootstrap';

const ImagenTexto = ({ servicio }) => {
  return (
    <Row className='pr-5 pl-5 pt-3 pb-3 w-100 text-white'>
      <Col sm='6' className='h-50 d-flex justify-content-center'>
        <img
          style={{ width: '60%' }}
          src={servicio.imagen}
          alt={servicio.titulo}
        />
      </Col>
      <Col sm='6' className='pt-2 pr-5 text-align-justify'>
        <h2>{servicio.titulo}</h2>
        <p>{servicio.descripcion}</p>
      </Col>
    </Row>
  );
};

export default ImagenTexto;
