import { useState } from 'react';

import { Form } from 'react-bootstrap';
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
} from '@material-ui/icons';
import {
  FormControl,
  Grid,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import {
  LoginContainer,
  ImageContainer,
  IlustrativeBox,
  FormBox,
  CssTextField,
  styles,
} from './LoginStyles';
import { Boton } from '@/components/CommonStyles/CommonStyles';

const LogIn = ({ handleSubmit }) => {
  const classes = styles();
  const matches = useMediaQuery('(max-width:768px)');
  const [showPassword, setshowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  return (
    <LoginContainer>
      <IlustrativeBox>
        {matches ? <h3>Company Name</h3> : <h2>Company Name</h2>}
        <ImageContainer>
          <img className='w-100' src='/login_image.png' />
        </ImageContainer>
      </IlustrativeBox>
      <FormBox>
        {matches ? (
          <h4 className={matches ? 'mb-0' : 'mb-5'}>Login</h4>
        ) : (
          <h3 className={matches ? 'mb-0' : 'mb-5'}>Login</h3>
        )}
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <Grid
              container
              className={matches ? 'mb-2' : 'mb-5'}
              alignItems='flex-end'>
              <Grid className='mr-1' item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <CssTextField
                  className={classes.root}
                  id='input-with-icon-grid'
                  InputProps={{
                    className: classes.input,
                  }}
                  name='username'
                  label='Usuario'
                />
              </Grid>
            </Grid>
          </FormControl>
          <br />
          <FormControl variant='outlined'>
            <Grid
              container
              className={matches ? 'mb-3' : 'mb-5'}
              alignItems='flex-end'>
              <Grid className='mr-1' item>
                <Lock />
              </Grid>
              <Grid item>
                <CssTextField
                  id='standard-adornment-password'
                  name='password'
                  label='Constraseña'
                  type={showPassword ? 'text' : 'password'}
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={{ color: 'white' }}
                  className='p-0'
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Grid>
            </Grid>
          </FormControl>
          <br />
          <Boton
            type='submit'
            className={matches ? 'w-50' : 'w-100'}
            color='blue-variant'>
            Log In
          </Boton>
        </Form>
      </FormBox>
    </LoginContainer>
  );
};

export default LogIn;
