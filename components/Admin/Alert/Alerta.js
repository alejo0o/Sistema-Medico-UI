import { Alert } from 'react-bootstrap';

const Alerta = ({ mensaje, color }) => {
  return <Alert variant={color}>{mensaje}</Alert>;
};

export default Alerta;
