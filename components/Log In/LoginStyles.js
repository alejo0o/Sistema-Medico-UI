import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

//Material UI
export const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiTextField-root': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
  },
})(TextField);

export const styles = makeStyles({
  root: { color: 'white' },
  input: { color: 'white' },
});

//Page Login
export const MainContainer = styled.div`
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  border: solid 10px white;
  border-radius: 15px;
  width: 70%;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
`;

export const IlustrativeBox = styled.div`
  width: 60%;
  padding: 1em;
  color: white;
  background: #00d2ff;
  background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);
  background: linear-gradient(to right, #3a7bd5, #00d2ff);

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const FormBox = styled.div`
  width: 40%;
  padding: 3em;
  background-color: #045de9;
  background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
  border-left: solid 5px white;
  color: white;

  @media screen and (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: solid 5px white;
    padding: 1em;
  }
`;
