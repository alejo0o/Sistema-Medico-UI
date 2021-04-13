import { Col, Row } from 'react-bootstrap';
import FormControlSkeleton from '@/components/Admin/Skeletons/FormControlSkeleton';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  header: {
    height: '50px',
    marginBottom: '1em',
    width: '220px',
  },
  button: {
    height: '65px',
    width: '150px',
    background: '#00a5e9',
    margin: '0 auto',
  },
}));

const FormSkeleton = ({ number }) => {
  const classes = useStyles();
  let items = [];
  for (let i = 0; i < number; i++) {
    items.push(
      <Row key={i}>
        <Col sm='4'>
          <FormControlSkeleton />
        </Col>
        <Col sm='4'>
          <FormControlSkeleton />
        </Col>
        <Col sm='4'>
          <FormControlSkeleton />
        </Col>
      </Row>
    );
  }
  return (
    <div className='p-4'>
      <Skeleton animation='wave' className={classes.header} />
      {items.map((componente) => componente)}
      <Skeleton animation='pulse' className={classes.button} />
    </div>
  );
};

export default FormSkeleton;
