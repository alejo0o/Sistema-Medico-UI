import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';
import { Boton } from '@/components/CommonStyles/CommonStyles';

const Evoluciones = ({
  evoluciones,
  handleShowInfo,
  paciente,
  handleModalDelete,
}) => {
  return (
    <div className='p-3'>
      <h2>{`${paciente.nombres} ${paciente.apellidos}`}</h2>
      <h3>{`CI: ${paciente.cedula}`}</h3>
      <h4>Evoluciones</h4>

      <Link href={`/admin/paciente/cevolucion/${paciente.paciente_id}`}>
        <Boton className='btn mb-2'>Nueva Evolución</Boton>
      </Link>

      {/*-----------------Tabla-------------*/}
      <Table striped bordered hover variant='dark' responsive>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>Fecha</th>
            <th>Información</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {evoluciones.map((evolucion) => (
            <tr key={evolucion.evolucion_id} style={{ textAlign: 'center' }}>
              <td>{evolucion.fecha}</td>
              <td>
                <Button
                  variant='primary'
                  onClick={() => {
                    handleShowInfo(evolucion);
                  }}>
                  <i className='fas fa-info-circle' />
                </Button>
              </td>
              <td>
                <Link href={`/admin/pacientes`}>
                  <Button variant='primary'>
                    <i className='fas fa-edit' />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant='danger'
                  onClick={() => {
                    handleModalDelete(evolucion);
                  }}>
                  <i className='fas fa-trash-alt' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Evoluciones;
