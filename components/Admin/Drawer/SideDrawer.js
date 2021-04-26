import Link from 'next/link';
//import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useStyles } from './DrawerStyles';

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
        <Link href='/admin/citas'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='far fa-calendar-alt' />
            </ListItemIcon>
            <ListItemText primary={'Citas'} />
          </ListItem>
        </Link>
        <Link href='/admin/medicos'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-user-md' />
            </ListItemIcon>
            <ListItemText primary={'Médicos'} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  const miniDrawer = (
    <List>
      <ListItem button className={classes.styledLink}>
        <ListItemIcon>
          <i className='fas fa-hospital' style={{ fontSize: '2em' }} />
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Link href='/admin/pacientes'>
        <ListItem
          button
          className={classes.styledLink}
          style={{ marginTop: '1em' }}>
          <ListItemIcon>
            <i className='fas fa-users' style={{ fontSize: '1.5em' }} />
          </ListItemIcon>
        </ListItem>
      </Link>
      <Divider />
      <Link href='/admin/citas'>
        <ListItem
          button
          className={classes.styledLink}
          style={{ marginTop: '1em' }}>
          <ListItemIcon>
            <i className='far fa-calendar-alt' style={{ fontSize: '2em' }} />
          </ListItemIcon>
        </ListItem>
      </Link>
      <Divider />
      <Link href='/admin/medicos'>
        <ListItem
          button
          className={classes.styledLink}
          style={{ marginTop: '1em' }}>
          <ListItemIcon>
            <i className='fas fa-user-md' style={{ fontSize: '2em' }} />
          </ListItemIcon>
        </ListItem>
      </Link>
    </List>
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
      ) : props.miniDrawer ? (
        <div className={classes.miniDrawer}>{miniDrawer}</div>
      ) : (
        <div className={classes.drawer}>{drawer}</div>
      )}
    </div>
  );
}

export default ResponsiveDrawer;
