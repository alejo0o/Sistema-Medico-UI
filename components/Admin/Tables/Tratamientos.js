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
  tratamientos,
  handleModalDelete,
  handleChangeQuery,
  tratamientosQuery,
  handleSearchTratamientos,
  handleSearchTratamientosKey,
}) {
  const classes = useStyles();

  return (
    <div className='p-3'>
      <h1>Tratamientos</h1>

      <Link href='/admin/tratamiento'>
        <a style={{ textDecoration: 'none' }}>
          <Boton size='lg' className='mb-3 mt-1'>
            Nuevo Tratamiento <i className='fas fa-tablets' />
          </Boton>
        </a>
      </Link>
      <br />

      <Form.Group as={Col} sm='4' className='pl-0'>
        <Form.Label>Nombre del tratamiento:</Form.Label>
        <div className='d-flex'>
          <Form.Control
            placeholder='nombre tratamiento'
            name='tratamiento'
            type='text'
            value={tratamientosQuery}
            onChange={handleChangeQuery}
            onKeyDown={handleSearchTratamientosKey}
          />
          <Boton className='' onClick={handleSearchTratamientos}>
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
                Nombre
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Precio
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
            {tratamientos.map((tratamiento) => (
              <StyledTableRow hover key={tratamiento.tratamiento_id}>
                <StyledTableCell component='td' align='center' scope='row'>
                  {tratamiento.nombre}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {tratamiento.precio}$
                </StyledTableCell>

                <StyledTableCell component='td' align='center'>
                  <Link
                    href={`/admin/tratamiento/${tratamiento.tratamiento_id}`}>
                    <Button variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleModalDelete(tratamiento);
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
