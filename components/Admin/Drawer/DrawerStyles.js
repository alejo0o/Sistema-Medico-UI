import { makeStyles } from '@material-ui/core/styles';

//MATERIAL UI STYLES
const drawerWidth = 225;

export const useStyles = makeStyles((theme) => ({
  miniDrawer: {
    width: 60,
    height: '100%',
    background: '#42C3F7',
    color: 'white',
  },
  drawer: {
    width: 225,
    height: '100%',
    background: '#42C3F7',
    color: 'white',
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#42C3F7',
    color: 'white',
  },
  drawerImage: {
    width: '100',
    height: '90',
    padding: '2em',
  },
  styledLink: {
    '& i': {
      color: 'white',
      transition: '0.5s',
    },
    cursor: 'pointer',
    transition: '0.5s',
    '&:hover': {
      '& i': {
        color: 'black',
      },
      backgroundImage:
        'linear-gradient(to right, #ECE9E6 0%, #FFFFFF  51%, #ECE9E6  100%)',
      color: 'black',
    },
  },
}));
