import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
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

export default function CustomizedTables({
  medicos,
  handleShowInfo,
  handleModalDelete,
  handleChangeQuery,
  medicosQuery,
  handleSearchMedicos,
  handleSearchMedicosKey,
}) {
  const classes = useStyles();

  return (
    <div className='p-3'>
      <h1>Médicos</h1>

      <Link href='/admin/medico'>
        <a style={{ textDecoration: 'none' }}>
          <Boton size='lg' className='mb-3 mt-1'>
            Nuevo Médico <i className='fas fa-user-md' />
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
            value={medicosQuery}
            onChange={handleChangeQuery}
            onKeyDown={handleSearchMedicosKey}
          />
          <Boton className='' onClick={handleSearchMedicos}>
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
            {medicos.map((medico) => (
              <StyledTableRow hover key={medico.medico_id}>
                <StyledTableCell component='td' align='center' scope='row'>
                  {medico.cedula}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {medico.nombres}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {medico.apellidos}
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='primary'
                    onClick={() => {
                      handleShowInfo(medico);
                    }}>
                    <i className='fas fa-info-circle' />
                  </Button>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Link href={`/admin/medico/${medico.medico_id}`}>
                    <Button variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleModalDelete(medico);
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
