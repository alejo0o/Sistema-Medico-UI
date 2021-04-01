import styled from 'styled-components';

export const AlergiasContainer = styled.div`
  background: linear-gradient(to right, #eb3349 0%, #f45c43 51%, #eb3349 100%);
  color: #fff;
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  margin-right: 1em;
  @media screen and (max-width: 768px) {
    margin: 0em;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
