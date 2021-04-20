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
import { Button } from 'react-bootstrap';
import {
  ButtonsContainer,
  ButtonContainer,
} from '@/components/Admin/HistoriaClinica/HistoriaClinicaStyle';

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

export default function CustomizedTables({
  evoluciones,
  handleShowInfo,
  paciente,
  handleModalDelete,
}) {
  const classes = useStyles();

  return (
    <div className='p-3'>
      <h2>{`${paciente.nombres} ${paciente.apellidos}`}</h2>
      <h4>{`CI: ${paciente.cedula}`}</h4>
      <h4>Evoluciones</h4>

      <ButtonsContainer>
        <ButtonContainer>
          <Link
            href={`/admin/paciente/historia/crearevolucion/${paciente.paciente_id}`}>
            <Boton size='lg' color='blue' className='btn mb-2'>
              Nueva Evolución
            </Boton>
          </Link>
        </ButtonContainer>
        <ButtonContainer>
          <Link href={`/admin/paciente/historia/${paciente.paciente_id}`}>
            <Boton size='lg' color='blue-variant' className='btn mb-2'>
              Historia Clínica
            </Boton>
          </Link>
        </ButtonContainer>
      </ButtonsContainer>

      {/*-----------------Tabla-------------*/}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell component='th' align='center'>
                Fecha
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
            {evoluciones.map((evolucion) => (
              <StyledTableRow hover key={evolucion.evolucion_id}>
                <StyledTableCell component='td' align='center' scope='row'>
                  {evolucion.fecha}
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='primary'
                    onClick={() => {
                      handleShowInfo(evolucion);
                    }}>
                    <i className='fas fa-info-circle' />
                  </Button>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Link
                    href={`/admin/paciente/historia/editarevolucion/${paciente.paciente_id}/${evolucion.evolucion_id}`}>
                    <Button variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleModalDelete(evolucion);
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
