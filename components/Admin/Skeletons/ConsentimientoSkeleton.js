import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';

const ConsentimientoSkeleton = () => {
  return (
    <div className='p-3'>
      <div className='p-1' style={{ border: 'solid 2px black' }}>
        <Row>
          <Col>
            <Skeleton animation='wave' varian='rect' height={50} width={500} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Skeleton animation='wave' varian='rect' height={200} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Skeleton animation='wave' varian='rect' height={50} width={500} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Skeleton animation='wave' varian='rect' height={200} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConsentimientoSkeleton;
