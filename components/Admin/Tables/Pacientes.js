import { Table, Button } from 'react-bootstrap';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import Link from 'next/link';

const Pacientes = ({ pacientes, handleShowInfo, handleModalDelete }) => {
  return (
    <div className='p-3'>
      <h1>Pacientes</h1>

      <Link href='/admin/paciente'>
        <Boton className='btn mb-3 mt-2'>Nuevo Paciente</Boton>
      </Link>

      {/*-----------------Tabla-------------*/}
      <Table striped bordered hover variant='dark' responsive>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Información</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.paciente_id} style={{ textAlign: 'center' }}>
              <td>{paciente.cedula}</td>
              <td>{paciente.nombres}</td>
              <td>{paciente.apellidos}</td>
              <td>
                <Button
                  variant='primary'
                  onClick={() => {
                    handleShowInfo(paciente);
                  }}>
                  <i className='fas fa-info-circle' />
                </Button>
              </td>
              <td>
                <Link href={`/admin/epaciente/${paciente.paciente_id}`}>
                  <Button variant='primary'>
                    <i className='fas fa-edit' />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant='danger'
                  onClick={() => {
                    handleModalDelete(paciente);
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

export default Pacientes;
