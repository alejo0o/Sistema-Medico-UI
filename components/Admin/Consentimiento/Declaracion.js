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
                <strong>22. DECLARACIÓN DE CONSENTIMIENTO INFORMADO</strong>
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
            <Col className='d-flex align-items-center'>
              <strong>Hora:</strong>
              <TextField
                id='hora-consentimiento'
                label=''
                className='ml-2'
                type='time'
                helperText=''
              />
            </Col>
          </Row>
          <Row className='p-3'>
            <Col>
              <p>
                He facilitado la información completa que conozco y me ha sido
                solicitada, sobre los antecedentes personales, familiares y de
                mi estado de salud. Soy consciente de que omitir estos datos
                puede afectar los resultados del tratamiento. Estoy de acuerdo
                con el procedimiento que se me ha propuesto; he sido informado
                de las ventajas e inconvenientes del mismo; se me ha explicado
                de forma clara en qué consiste, los beneficios y posibles
                riesgos del procedimiento. He escuchado leído y comprendido la
                información recibida y se me ha dado la oportunidad de preguntar
                sobre el procedimiento. He tomado consciente y libremente la
                decisión de autorizar el procedimiento. Consiento que durante la
                intervención, me realicen otro procedimiento adicional, si es
                considerado necesario según el juicio del profesional de la
                salud, para mi beneficio. También conozco que puedo retirar mi
                consentimiento cuando lo estime oportuno.
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
                helperText='Firma, sello y código del profesional de la salud que realizará el procedimiento'
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
        </div>
      </div>
    );
  }
}
