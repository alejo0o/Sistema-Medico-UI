import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const NavButton = styled(Button)`
  margin-right: 1em;
  @media screen and (max-width: 768px) {
    margin: 0.5em 0em;
  }
`;
