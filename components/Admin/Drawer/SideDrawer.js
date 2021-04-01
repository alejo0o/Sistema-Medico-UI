import Link from 'next/link';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './DrawerStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:991px)');

  const drawer = (
    <div>
      <div className={classes.drawerImage}>
        <img
          className='w-100 h-100'
          alt=''
          src='https://www.pngitem.com/pimgs/m/226-2261747_company-name-icon-png-transparent-png.png'
        />
      </div>
      <Divider />
      <List>
        <Link href='/admin/pacientes'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-users' />
            </ListItemIcon>
            <ListItemText primary={'Pacientes'} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {matches ? (
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {drawer}
        </Drawer>
      ) : (
        <div className={classes.drawer}>{drawer}</div>
      )}
    </div>
  );
}

export default ResponsiveDrawer;
