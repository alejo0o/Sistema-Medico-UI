import styled from 'styled-components';
import { Col, Button } from 'react-bootstrap';

export const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;
export const Boton = styled(Button)`
  background-image: ${(props) => {
    switch (props.color) {
      case 'blue':
        return 'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)';
      case 'red':
        return 'linear-gradient(to right, #e52d27 0%, #b31217  51%, #e52d27  100%)';
      case 'green':
        return 'linear-gradient(to right, #348F50 0%, #56B4D3  51%, #348F50  100%)';
      case 'gray':
        return 'linear-gradient(to right, #bdc3c7 0%, #2c3e50  51%, #bdc3c7  100%)';
      case 'blue-variant':
        return 'linear-gradient(to right, #000046 0%, #1CB5E0  51%, #000046  100%)';
      default:
        return 'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)';
    }
  }};
  box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  border: none;
  text-align: center;
  //text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 7px;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`;
export const Boton_A = styled(Button)`
  background: #00a5e9;
  color: white;
  transition: 0.5s;
  &:hover {
    background: #42c3f7;
    color: white;
  }
`;
