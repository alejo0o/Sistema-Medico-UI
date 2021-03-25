import { Pagination } from '@material-ui/lab';
import { withRouter } from 'next/router';

const Paginated = ({ totalPages, router, path }) => {
  return (
    <div className='d-flex'>
      <Pagination
        style={{ margin: '0 auto' }}
        showFirstButton
        showLastButton
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
