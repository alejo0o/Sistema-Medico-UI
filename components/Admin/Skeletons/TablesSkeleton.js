import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';

export const useStyles = makeStyles((theme) => ({
  header: {
    height: '50px',
    marginBottom: '1em',
    width: '100%',
  },
  button: {
    height: '65px',
    width: '100%',
    background:
      'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)',
  },
  label: {
    height: '30px',
    width: '100%',
  },
  input: {
    height: '55px',
    width: '100%',
    marginRight: '0.5em',
  },
  search: {
    background:
      'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)',
  },
  table: {
    background: '#055C9D',
  },
}));

const TablesSkeleton = () => {
  const classes = useStyles();
  return (
    <div className='p-4'>
      <Row>
        <Col sm='2'>
          <Skeleton animation='wave' className={classes.header} />
        </Col>
      </Row>
      <Row>
        <Col sm='2'>
          <Skeleton animation='pulse' className={classes.button} />
        </Col>
      </Row>

      <Row>
        <Col className='d-flex' sm='4'>
          <Skeleton animation='wave' className={classes.input} />
        </Col>
      </Row>

      <Row>
        <Col>
          <div>
            <Skeleton
              animation='wave'
              variant='rect'
              className={classes.table}
              height={50}
            />
            <Skeleton animation='wave' variant='rect' height={300} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm='6' style={{ margin: '0 auto' }}>
          <Skeleton animation='wave' height={50} />
        </Col>
      </Row>
    </div>
  );
};

export default TablesSkeleton;
