import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//
import { Boton } from '@/components/CommonStyles/CommonStyles';
import Link from 'next/link';
import { Button, Form, Col } from 'react-bootstrap';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#055C9D',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function PacientesMUI({
  pacientes,
  handleModalDelete,
  handleShowInfo,
  handleChangeQuery,
  pacientesQuery,
  handleSearchPacientes,
}) {
  const classes = useStyles();

  return (
    <div className='p-3'>
      <h1>Pacientes</h1>

      <Link href='/admin/paciente'>
        <a style={{ textDecoration: 'none' }}>
          <Boton size='lg' className='mb-3 mt-1'>
            Nuevo Paciente <i className='fas fa-user' />
          </Boton>
        </a>
      </Link>
      <br />

      <Form.Group as={Col} sm='4' className='pl-0'>
        <Form.Label>Cédula o nombre:</Form.Label>
        <div className='d-flex'>
          <Form.Control
            placeholder='Cédula o Nombre'
            name='categoria'
            type='text'
            value={pacientesQuery}
            onChange={handleChangeQuery}
          />
          <Boton className='' onClick={handleSearchPacientes}>
            <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
          </Boton>
        </div>
      </Form.Group>

      {/*-----------------Tabla-------------*/}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell component='th' align='center'>
                DNI
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Nombres
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Apellidos
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Información
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Editar
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Eliminar
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <StyledTableRow hover key={paciente.paciente_id}>
                <StyledTableCell component='td' align='center' scope='row'>
                  {paciente.cedula}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {paciente.nombres}
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  {paciente.apellidos}
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='primary'
                    onClick={() => {
                      handleShowInfo(paciente);
                    }}>
                    <i className='fas fa-info-circle' />
                  </Button>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Link href={`/admin/epaciente/${paciente.paciente_id}`}>
                    <Button variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleModalDelete(paciente);
                    }}>
                    <i className='fas fa-trash-alt' />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
