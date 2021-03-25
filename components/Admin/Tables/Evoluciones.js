import { Table, Button } from 'react-bootstrap';

const Evoluciones = ({ evoluciones, handleShowInfo, paciente }) => {
  return (
    <div className='p-3'>
      <h2>{`${paciente.nombres} ${paciente.apellidos}`}</h2>
      <h3>{`CI: ${paciente.cedula}`}</h3>
      <h4>Evoluciones</h4>

      <Button variant='dark' className='mb-2'>
        Nueva Evolucion
      </Button>

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
                  <i className='fas fa-info-circle'></i>
                </Button>
              </td>
              <td>
                <Button variant='primary' onClick={() => {}}>
                  <i className='fas fa-edit'></i>
                </Button>
              </td>
              <td>
                <Button variant='danger' onClick={() => {}}>
                  <i className='fas fa-trash-alt'></i>
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
