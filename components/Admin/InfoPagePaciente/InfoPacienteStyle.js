import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

export const Columna = styled(Col)`
  border: solid 1.5px #055c9d;
`;
export const Fila = styled(Row)``;

export const Boton = styled.a`
  background: #00a5e9;
  color: white;
  transition: 0.5s;
  &:hover {
    background: #42c3f7;
    color: white;
  }
`;
