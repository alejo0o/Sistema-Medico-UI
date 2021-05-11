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
import { Dropdown } from 'react-bootstrap';
import useUser from '@/components/utils/useUser';

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { user } = useUser({ redirectTo: '/' });

  const matches = useMediaQuery('(max-width:991px)');

  const drawer = (
    <div>
      <div className={classes.drawerImage}>
        <img className='w-100 h-100' alt='' src={props.logo} />
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

        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-basic'
            className='w-100'
            as={ListItem}
            button
            className={classes.styledLink}>
            <ListItemIcon id='list-item-id'>
              <i className='far fa-calendar-alt' />
            </ListItemIcon>
            <ListItemText primary={'Citas'} />
          </Dropdown.Toggle>

          <Dropdown.Menu className='w-100'>
            <Link href='/admin/citas'>
              <a className='dropdown-item'>Calendario</a>
            </Link>
            <Link href='/admin/citas2'>
              <a className='dropdown-item'>Calenadario Variante</a>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
        <Link href='/admin/medicos'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-user-md' />
            </ListItemIcon>
            <ListItemText primary={'Médicos'} />
          </ListItem>
        </Link>
        <Link href='/admin/tratamientos'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-pills' />
            </ListItemIcon>
            <ListItemText primary={'Tratamientos'} />
          </ListItem>
        </Link>
        <Link href='/admin/materiales'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-dolly-flatbed' />
            </ListItemIcon>
            <ListItemText primary={'Inventario'} />
          </ListItem>
        </Link>

        {user ? (
          user.tipo === 'admin' ? (
            <Link href='/admin/usuarios'>
              <ListItem button className={classes.styledLink}>
                <ListItemIcon>
                  <i className='fas fa-users-cog' />
                </ListItemIcon>
                <ListItemText primary={'Usuarios'} />
              </ListItem>
            </Link>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-basic'
            className='w-100'
            as={ListItem}
            button
            className={classes.styledLink}>
            <ListItemIcon id='list-item-id'>
              <i className='fas fa-file-alt' />
            </ListItemIcon>
            Consentimiento <br />
            Informado
          </Dropdown.Toggle>

          <Dropdown.Menu className='w-100'>
            <Link href='/admin/consentimiento/declaracion'>
              <a className='dropdown-item'>Declaración</a>
            </Link>
            <Link href='/admin/consentimiento/negativa'>
              <a className='dropdown-item'>Negativa</a>
            </Link>
            <Link href='/admin/consentimiento/revocatoria'>
              <a className='dropdown-item'>Revocatoria</a>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
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
      <Divider />
      <Link href='/admin/tratamientos'>
        <ListItem
          button
          className={classes.styledLink}
          style={{ marginTop: '1em' }}>
          <ListItemIcon>
            <i className='fas fa-pills' />
          </ListItemIcon>
        </ListItem>
      </Link>
      <Divider />
      <Link href='/admin/materiales'>
        <ListItem
          button
          className={classes.styledLink}
          style={{ marginTop: '1em' }}>
          <ListItemIcon>
            <i className='fas fa-dolly-flatbed' />
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
