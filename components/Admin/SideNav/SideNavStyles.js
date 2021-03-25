import styled from 'styled-components';

export const NavStyle = {
  width: 250,
  height: '100vh',
  background: '#42C3F7',
  textAlign: 'center',
};

export const SideNavImg = styled.div`
  width: 100;
  height: 90;
  padding: 2em;
`;

export const Styled_link = styled.a`
  color: white;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background: #d4f1f4;
    color: black;
  }
`;
