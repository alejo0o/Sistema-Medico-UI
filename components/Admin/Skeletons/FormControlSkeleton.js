import { Skeleton } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  input: {
    height: '100%',
    width: '100%',
  },
}));

const FormControlSkeleton = () => {
  const classes = useStyles();
  return (
    <div>
      <div className='w-50' style={{ height: '30px' }}>
        <Skeleton animation='wave' className={classes.input} />
      </div>
      <div className='w-100' style={{ height: '55px' }}>
        <Skeleton animation='wave' className={classes.input} />
      </div>
    </div>
  );
};

export default FormControlSkeleton;
