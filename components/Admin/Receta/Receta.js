import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BgContainer, BgImg } from '@/components/Admin/Receta/RecetaStyles';
import { getEdad } from '@/components/utils/utils';

class Receta extends PureComponent {
  parseEspecialidades = (especialidades) => {
    let especialidades_string = '';
    let especialidades_array = Object.keys(especialidades);
    especialidades_array.forEach((key, i) => {
      especialidades_string += `${especialidades[key]}${
        i != especialidades_array.length - 1 ? ', ' : ''
      }`;
    });

    return especialidades_string;
  };

  render() {
    const { medico, consultorio, data } = this.props;
    return (
      <div className='p-4'>
        <div style={{ border: 'solid 2px black' }}>
          <div className='d-flex w-100'>
            <div className='position-absolute'>
              <img
                alt={consultorio.nombre}
                src={consultorio.logo}
                width='70'
                height='70'
                className='d-inline-block align-top'
              />
            </div>
            <div className='w-100 text-center'>
              <h3>
                <strong>{`Dr. ${medico.nombres} ${medico.apellidos}`}</strong>
              </h3>
              <div>
                {this.parseEspecialidades(JSON.parse(medico.especialidades))}
              </div>
              <div>Ced. {medico.cedula}</div>
              <div>Teléfono: {medico.telefono}</div>
            </div>
          </div>

          <BgContainer className='w-100 justify-content-center'>
            <div className=' w-100 p-2'>
              <Row className='pl-2 pr-2'>
                <Col>
                  <strong>Paciente: </strong>
                  {`${data.nombres} ${data.apellidos}`}
                </Col>
                <Col>
                  <strong>Edad: </strong>
                  {getEdad(data.fechanacimiento)} años
                </Col>
                <Col>
                  <strong>Sexo: </strong>
                  {data.genero}
                </Col>
              </Row>
            </div>
            <BgImg imagen={consultorio.logo} />
            <Row>
              <div className='d-flex'>
                <div className='w-50 p-5' style={{ textAlign: 'justify' }}>
                  <h5>
                    <strong>Medicación</strong>
                  </h5>
                  <div>{data.medicacion}</div>
                </div>
                <div className='w-50 p-5' style={{ textAlign: 'justify' }}>
                  <h5>
                    <strong>Indicaciones:</strong>
                  </h5>
                  <div>{data.indicaciones}</div>
                </div>
              </div>
            </Row>
            <Row className='p-2 pt-5 d-flex justify-content-center'>
              <div
                style={{
                  borderTop: 'solid 2px black',
                  width: '20%',
                  textAlign: 'center',
                }}>
                Firma
              </div>
            </Row>
          </BgContainer>
          <div className='d-flex w-100 pl-2 pr-2'>
            <div className='w-50'>
              <h4>Dirección: {consultorio.nombre}</h4>
            </div>
            <div className='w-50'>
              <div>Dirección: {consultorio.direccion}</div>
              <div>Teléfono: {consultorio.telefono}</div>
              <div>Correo: {consultorio.correo}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Receta;
