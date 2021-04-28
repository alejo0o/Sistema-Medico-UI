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
  materiales,
  handleModalDelete,
  handleChangeQuery,
  materialesQuery,
  handleSearchMateriales,
  handleSearchMaterialesKey,
}) {
  const classes = useStyles();

  return (
    <div className='p-3'>
      <h1>Inventario</h1>

      <Link href='/admin/insumo'>
        <a style={{ textDecoration: 'none' }}>
          <Boton size='lg' className='mb-3 mt-1'>
            Nuevo Material <i className='fas fa-truck-loading' />
          </Boton>
        </a>
      </Link>
      <br />

      <Form.Group as={Col} sm='4' className='pl-0'>
        <Form.Label>Nombre del material:</Form.Label>
        <div className='d-flex'>
          <Form.Control
            placeholder='nombre material'
            name='material'
            type='text'
            value={materialesQuery}
            onChange={handleChangeQuery}
            onKeyDown={handleSearchMaterialesKey}
          />
          <Boton className='' onClick={handleSearchMateriales}>
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
                Precio Unitario
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Cantidad
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
            {materiales.map((material) => (
              <StyledTableRow hover key={material.inventario_id}>
                <StyledTableCell component='td' align='center' scope='row'>
                  {material.nombre}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {material.costo_unitario}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {material.cantidad}
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Link href={`/admin/insumo/${material.inventario_id}`}>
                    <Button variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleModalDelete(material);
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
