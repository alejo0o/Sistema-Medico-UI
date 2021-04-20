import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const CalendarContainer = styled.div`
  padding: 1em;
  color: #003a6b;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  border-radius: 15px;
  background: #c9d6ff;
  background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff);
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
`;

export const StyledInfo = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  //color: #00a5e9;
  cursor: pointer;

  text-align: center;

  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;

  background-image: linear-gradient(
    to right,
    #00d2ff 0%,
    #3a7bd5 51%,
    #00d2ff 100%
  );

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`;

export const WeekHeader = styled.div`
  text-align: center;
  font-weight: 700;
  background-color: #43b0f1;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(135px, 350px));
  @media screen and (max-width: 1264px) {
    grid-template-columns: repeat(4, minmax(auto, auto));
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(auto, auto));
  }
`;
export const IconMonth = styled.i`
  font-size: 1.5em;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    font-size: 2em;
  }
`;
export const DayContainer = styled.div`
  height: 250px;
  font-weight: 700;
  border: solid 1px #003a6b;
  scrollbar-width: thin;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
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

export const Nota = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  font-weight: normal;
  font-size: 0.9em;
  transition: 0.5s;
  &:hover {
    color: white;
    background-color: #045de9;
    background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
  }
`;

export const NotaCircle = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  display: inline-block;
`;
