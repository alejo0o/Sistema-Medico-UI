import { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

export default class Negativa extends PureComponent {
  render() {
    return (
      <div className='p-3'>
        <div className='p-1' style={{ border: 'solid 2px black' }}>
          <Row>
            <Col>
              <h5>
                <strong>23. NEGATIVA DEL CONSENTIMIENTO INFORMADO</strong>
              </h5>
            </Col>
            <Col className='d-flex align-items-center'>
              <strong>Fecha:</strong>
              <TextField
                id='fecha-consentimiento'
                label=''
                className='ml-2'
                type='date'
                helperText=''
              />
            </Col>
          </Row>
          <Row className='p-3'>
            <Col>
              <p>
                Una vez que he entendido claramente el procedimiento propuesto,
                así como las consecuencias posibles si no se realiza la
                intervención, no autorizo y me niego a que se me realice el
                procedimiento propuesto y desvinculo de responsabilidades
                futuras de cualquier índole al establecimiento de salud y al
                profesional sanitario que me atiende, por no realizar la
                intervención sugerida.
              </p>
            </Col>
          </Row>
          <Row className='p-3'>
            <Col sm={`${this.props.columna}`}>
              <TextField
                id='nombre-paciente'
                label=''
                multiline
                rows={4}
                helperText='Nombre completo del paciente........'
              />
            </Col>
            <Col className='pt-5' sm={`${this.props.columna}`}>
              <TextField
                id='cedula-paciente'
                label=''
                helperText='Cédula de ciudadanía'
              />
            </Col>
            <Col className='pt-5' sm={`${this.props.columna}`}>
              <TextField
                id='firma-paciente'
                label=''
                helperText='Firma del paciente o huella, según el caso'
              />
            </Col>
          </Row>
          <Row className='p-3'>
            <Col sm={`${this.props.columna2}`}>
              <TextField
                id='nombre-medico'
                label=''
                multiline
                rows={4}
                helperText='Nombre del profesional que realiza el procedimiento'
              />
            </Col>
            <Col sm={`${this.props.columna2}`} className='pt-5'>
              <TextField
                id='firma-medico'
                label=''
                helperText='Firma, sello y código del profesional tratante'
              />
            </Col>
          </Row>
          <Row className='p-3'>
            <h5>
              <strong>
                Si el paciente no está en capacidad para firmar el
                consentimiento informado:
              </strong>
            </h5>
          </Row>
          <Row className='p-3'>
            <Col sm={`${this.props.columna}`}>
              <TextField
                id='nombre-representante'
                label=''
                multiline
                rows={4}
                helperText='Nombre del representante legal........'
              />
            </Col>
            <Col sm={`${this.props.columna}`} className='pt-5'>
              <TextField
                id='cedula-representante'
                label=''
                helperText='Cédula de ciudadanía'
              />
            </Col>
            <Col sm={`${this.props.columna}`} className='pt-5'>
              <TextField
                id='firma-representante'
                label=''
                helperText='Firma del representante legal'
              />
            </Col>
          </Row>
          <Row className='p-3'>
            <Col sm={this.props.columna2}>
              <TextField id='parentesco' label='' helperText='Parentesco' />
            </Col>
          </Row>
          <Row className='p-3'>
            <h5>
              <strong>
                Si el paciente no apecta el procedimiento sugerido por el
                profesional y se niega a firmar este acápite:
              </strong>
            </h5>
          </Row>
          <Row className='p-3'>
            <Col sm={`${this.props.columna}`}>
              <TextField
                id='nombre-testigo'
                label=''
                multiline
                rows={4}
                helperText='Nombre completo del testigo........'
              />
            </Col>
            <Col className='pt-5' sm={`${this.props.columna}`}>
              <TextField
                id='cedula-testigo'
                label=''
                helperText='Cédula de ciudadanía'
              />
            </Col>
            <Col className='pt-5' sm={`${this.props.columna}`}>
              <TextField
                id='firma-testigo'
                label=''
                helperText='Firma del testigo'
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
