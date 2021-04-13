import {
  MainContainer,
  LoginContainer,
  IlustrativeBox,
  FormBox,
} from '@/components/Log In/LoginStyles';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from 'react-bootstrap';
import { useMediaQuery } from '@material-ui/core';
import FormControlSkeleton from './FormControlSkeleton';

export const useStyles = makeStyles((theme) => ({
  image: {
    height: '100%',
    width: '100%',
  },
  header: {
    height: '45px',
    marginBottom: '1em',
    width: '100%',
  },
  button: {
    height: '40px',
    width: '100%',
    borderRadius: '15px',
    background:
      'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)',
  },
}));

const LoginSkeleton = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  return (
    <MainContainer>
      <LoginContainer>
        <IlustrativeBox>
          <Col sm='8'>
            <Skeleton variant='rect' className={classes.header} />
          </Col>
          <img className='w-100' src='/login_image.png' />
        </IlustrativeBox>
        <FormBox>
          <Col>
            <Row className={matches ? 'mb-0' : 'mb-5'}>
              <Col sm='10'>
                <Skeleton variant='rect' className={classes.header} />
              </Col>
            </Row>
            <Row className={matches ? 'mb-0' : 'mb-5'}>
              <Col sm='12'>
                <FormControlSkeleton />
              </Col>
            </Row>
            <Row className={matches ? 'mb-0' : 'mb-5'}>
              <Col sm='12'>
                <FormControlSkeleton />
              </Col>
            </Row>
            <Row>
              <Col sm='12'>
                <Skeleton variant='rect' className={classes.button} />
              </Col>
            </Row>
          </Col>
        </FormBox>
      </LoginContainer>
    </MainContainer>
  );
};

export default LoginSkeleton;
