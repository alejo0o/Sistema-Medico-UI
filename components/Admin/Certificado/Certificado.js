import React, { PureComponent } from 'react';
import { TextareaAutosize, TextField } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { BgContainer, BgImg } from '@/components/Admin/Receta/RecetaStyles';
import { getEdad, get_fecha } from '@/components/utils/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  parseDiagnostico = (diagnostico) => {
    let diagnostico_string = '';
    diagnostico.forEach((enfermedad, i) => {
      diagnostico_string += `${enfermedad.descripcion}(${enfermedad.codigo})${
        i != diagnostico.length - 1 ? ', ' : ''
      }`;
    });

    return diagnostico_string;
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
              <h4>
                <strong>{consultorio.nombre}</strong>
              </h4>
              <div></div>
              <div>
                <strong>Dirección:</strong> {consultorio.direccion}
              </div>
              <div>
                <strong>Teléfono:</strong> {medico.telefono}
              </div>
            </div>
          </div>

          <div className='w-100 justify-content-center'>
            <div className=' p-2 d-flex'>
              <div className='w-100 text-center'>
                <h3>
                  <strong>Certificado Médico</strong>
                </h3>
              </div>
            </div>
            <div className='pl-5'>
              <strong>Fecha:</strong>
              <TextField
                id='fecha-consentimiento'
                label=''
                className='ml-2'
                type='date'
                helperText=''
              />
            </div>
            <div className='p-5'>
              <h5>
                <strong>{`Dr./Dra. ${medico.nombres} ${medico.apellidos}`}</strong>
              </h5>
              <p>
                Especialista en{' '}
                {this.parseEspecialidades(JSON.parse(medico.especialidades))}
              </p>
              <h5>
                <strong>Certifica:</strong>
              </h5>

              <TextareaAutosize
                rowsMin={4}
                className='w-100'
                style={{ border: 'none', background: 'none' }}
                aria-label='maximum height'
                placeholder='Maximum 4 rows'
                defaultValue={`Basandose en el diagnóstico generado el ${format(
                  new Date(data.fecha),
                  'PP',
                  { locale: es }
                )}, el cual señala que el paciente padece de: ${this.parseDiagnostico(
                  JSON.parse(data.diagnostico)
                )}, este certificado médico acredita que ${
                  data.genero_id === 1 ? 'el Sr.' : 'la Sra.'
                } ${data.nombres
                  .toString()
                  .trim()} ${data.apellidos
                  .toString()
                  .trim()} con cédula de ciudadanía CI: ${data.cedula
                  .toString()
                  .trim()}, . . . . `}
              />
            </div>
            <div className='d-flex w-100 justify-content-center'>
              <div
                className='w-25 text-center'
                style={{ borderTop: 'solid 2px black' }}>
                Firma y sello del médico
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Receta;
