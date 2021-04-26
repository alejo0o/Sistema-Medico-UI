import { Pagination } from '@material-ui/lab';
import { withRouter } from 'next/router';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Paginated = ({ totalPages, router, path }) => {
  const matches = useMediaQuery('(max-width:768px)');
  return (
    <div className='d-flex'>
      <Pagination
        style={{ margin: '0 auto' }}
        showFirstButton
        showLastButton
        size={matches ? 'small' : 'medium'}
        color='primary'
        variant='outlined'
        count={totalPages}
        onChange={(event, value) => {
          router.push(`${path}?page=${value}`);
        }}
      />
    </div>
  );
};

export default withRouter(Paginated);
