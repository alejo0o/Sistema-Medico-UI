import { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

export default class Declaracion extends PureComponent {
  render() {
    return (
      <div className='p-3'>
        <div className='p-1' style={{ border: 'solid 2px black' }}>
          <Row>
            <Col>
              <h5>
                <strong>24. REVOCATORIA DE CONSENTIMIENTO INFORMADO</strong>
              </h5>
            </Col>
          </Row>
          <Row className='p-3'>
            <Col className=''>
              De forma libre y voluntaria, revoco el consentimiento realizado en
              fecha y manifiesto expresamente mi deseo de no continuar con el
              procedimiento médico que doy por finalizado en esta fecha:
              <TextField
                id='fecha-consentimiento'
                label=''
                className='ml-2'
                type='date'
                helperText=''
              />{' '}
              . Libero de responsabilidades futuras de cualquier índole al
              establecimiento de salud y al profesional sanitario que me
              atiende.
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
            <h5>
              <strong>
                Si el paciente no está en capacidad para firmar la negativa del
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
        </div>
      </div>
    );
  }
}
