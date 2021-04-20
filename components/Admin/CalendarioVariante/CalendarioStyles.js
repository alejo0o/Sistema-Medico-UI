import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  width:100%
  height:auto;
  height: 500px;
  
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
export const InfoContainer = styled.div`
  text-align: center;
  width: 40%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background: #00a6e8;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 768px) {
    width: auto;
    height: 100%;
    border-bottom-left-radius: unset;
    border-top-right-radius: 15px;
  }
`;

export const CalendarContainer = styled.div`
  width: 60%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  font-family: 'Kanit', sans-serif;
  background: #fff;
  @media screen and (max-width: 768px) {
    width: auto;
    border-top-right-radius: unset;
    border-bottom-left-radius: 15px;
  }
`;

export const WeekHeader = styled.div`
  text-align: center;
  width: 40%;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 460px) {
    width: 70%;
  }
`;

export const Columns = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(7, minmax(25px, 80px));
  text-align: center;

  gap: 10px;
`;
export const DayContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 28px;
  transition: 0.5s;
  &:hover {
    background: #00a6e8;
  }
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 460px) {
    width: 70%;
  }
`;
export const DiaInfo = styled.h1`
  margin-bottom: 0;
  font-size: 5.5em;
  font-weight: 900;
`;

export const NotaCircle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  background: #fff;
`;

export const CitasContainer = styled.div`
  height: 50%;
  width: 100%;
  overflow-y: auto;
  overflow-x: unset;
  padding: 0 1em;
  border-radius: 8px;
  border: solid 3px white;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const StyledCol = styled(Col)`
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.color};
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;
