import { Row, Col } from 'react-bootstrap';
import { StyledCol, StyledRow } from '../../CommonStyles/CommonStyles';
import Cell from '../../CommonStyles/TableCell';

const HistoriaClinicaTable = ({ historia_clinica }) => {
  return (
    <Col
      className='mt-4'
      style={{
        border: 'solid 2px #055c9d',
        borderRadius: '10px',
        background: 'white',
      }}>
      <StyledRow>
        <StyledCol>
          <Cell
            labelName='Antecedentes Patológicos'
            info={historia_clinica.antecedentes_patologicos}
          />
        </StyledCol>
        <StyledCol>
          <Cell
            labelName='Antecedentes Quirúrgicos'
            info={historia_clinica.antecedentes_quirurgicos}
          />
        </StyledCol>
        <Col>
          <Cell
            labelName='Antecedentes Familiares'
            info={historia_clinica.antecedentes_familiares}
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <StyledCol>
          <Cell
            labelName='Medicamentos Subministrados'
            info={historia_clinica.medicamentos_subministrados}
          />
        </StyledCol>
        <StyledCol>
          <Cell labelName='Gestas' info={historia_clinica.gestas} />
        </StyledCol>
        <Col>
          <Cell labelName='Partos' info={historia_clinica.partos} />
        </Col>
      </StyledRow>
      <StyledRow>
        <StyledCol>
          <Cell labelName='Cesareas' info={historia_clinica.cesareas} />
        </StyledCol>
        <StyledCol>
          <Cell labelName='Abortos' info={historia_clinica.abortos} />
        </StyledCol>
        <Col>
          <Cell
            labelName='Método Anticonceptivo'
            info={historia_clinica.metodo_anticonceptivo}
          />
        </Col>
      </StyledRow>
      <Row>
        <Col>
          <Cell labelName='Hábitos' info={historia_clinica.habitos} />
        </Col>
      </Row>
    </Col>
  );
};

export default HistoriaClinicaTable;
