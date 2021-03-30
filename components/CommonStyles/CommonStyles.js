import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';

export const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;
export const Boton = styled.a`
  background: #00a5e9;
  color: white;
  transition: 0.5s;
  &:hover {
    background: #42c3f7;
    color: white;
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
