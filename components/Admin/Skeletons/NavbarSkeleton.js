import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  navbar: {
    height: 55,
    background: '#00A5E9',
  },
}));

const NavbarSkeleton = () => {
  const classes = useStyles();
  return (
    <Skeleton animation='pulse' className={classes.navbar} variant='rect' />
  );
};

export default NavbarSkeleton;
