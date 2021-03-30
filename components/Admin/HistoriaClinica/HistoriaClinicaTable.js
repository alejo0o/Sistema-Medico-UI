import { Row, Col } from 'react-bootstrap';
import { StyledCol } from '@/components/CommonStyles/CommonStyles';
import Cell from '@/components/CommonStyles/TableCell';

const HistoriaClinicaTable = ({ historia_clinica, pacienteGenero }) => {
  return (
    <Col
      className='mt-4'
      style={{
        background: 'white',
      }}>
      <Row>
        <StyledCol sm='4'>
          <Cell
            labelName='Antecedentes Patológicos'
            info={historia_clinica.antecedentes_patologicos}
          />
        </StyledCol>
        <StyledCol sm='4'>
          <Cell
            labelName='Antecedentes Quirúrgicos'
            info={historia_clinica.antecedentes_quirurgicos}
          />
        </StyledCol>
        <StyledCol sm='4'>
          <Cell
            labelName='Antecedentes Familiares'
            info={historia_clinica.antecedentes_familiares}
          />
        </StyledCol>
      </Row>

      <Row>
        <StyledCol sm='4'>
          <Cell
            labelName='Medicamentos Subministrados'
            info={historia_clinica.medicamentos_subministrados}
          />
        </StyledCol>

        <StyledCol sm='4'>
          <Cell
            labelName='Método Anticonceptivo'
            info={historia_clinica.metodo_anticonceptivo}
          />
        </StyledCol>

        <StyledCol sm='4'>
          <Cell labelName='Hábitos' info={historia_clinica.habitos} />
        </StyledCol>
      </Row>
      {pacienteGenero != 1 && (
        <Row>
          <StyledCol sm='4'>
            <Cell labelName='Gestas' info={historia_clinica.gestas} />
          </StyledCol>

          <StyledCol sm='4'>
            <Cell labelName='Partos' info={historia_clinica.partos} />
          </StyledCol>

          <StyledCol sm='4'>
            <Cell labelName='Cesareas' info={historia_clinica.cesareas} />
          </StyledCol>
        </Row>
      )}

      {pacienteGenero != 1 && (
        <Row>
          <StyledCol sm='4'>
            <Cell labelName='Abortos' info={historia_clinica.abortos} />
          </StyledCol>
        </Row>
      )}
    </Col>
  );
};

export default HistoriaClinicaTable;
