import { useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 225,
    height: '100vh',
    background: '#42C3F7',
  },
}));

function ResponsiveDrawer() {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:991px)');

  return (
    <div>
      {matches ? (
        <></>
      ) : (
        <Skeleton animation='pulse' variant='rect' className={classes.drawer} />
      )}
    </div>
  );
}

export default ResponsiveDrawer;
