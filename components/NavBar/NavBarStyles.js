import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

export const NavBarItem = styled.a`
  color: white;
  transition: 0.5s;
  font-size: 1.2em;
  &:hover {
    color: #05445e;
    background: #dbf5f0;
  }
`;

export const StyledDropToggle = styled(Dropdown.Toggle)`
  color: white;
  background: ${(props) => props.color};
  border: none;
  transition: 0.5s;
  font-size: 1.2em;
  &:hover {
    color: #05445e;
    background: #dbf5f0;
  }
`;
