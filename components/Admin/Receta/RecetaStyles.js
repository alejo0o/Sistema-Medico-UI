import styled from 'styled-components';

export const BgContainer = styled.div`
  max-height: auto;
  border-top: ridge 15px #42c3f7;
  border-bottom: ridge 15px #42c3f7;
  position: relative;
  z-index: 1;
`;

export const BgImg = styled.div`
  display: flex;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${(props) => props.imagen});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  opacity: 0.1;
`;
