import { AlergiasContainer } from './HistoriaClinicaStyle';
import HistoriaTable from './HistoriaClinicaTable';
import ButtonsDisplay from './ButtonDisplay';
const HistoriaClinica = ({ historia_clinica, paciente, handleModalDelete }) => {
  return (
    <div className='p-3'>
      <h2>{`${historia_clinica.nombres} ${historia_clinica.apellidos}`}</h2>
      <h4>{`CI: ${historia_clinica.cedula}`}</h4>
      <ButtonsDisplay
        pacienteId={historia_clinica.paciente_id}
        handleModalDelete={handleModalDelete}
      />
      <AlergiasContainer className='p-3'>
        <h5>
          <strong>Alergias:</strong>
        </h5>
        <p>{historia_clinica.alergias}</p>
      </AlergiasContainer>
      <HistoriaTable
        historia_clinica={historia_clinica}
        pacienteGenero={paciente.genero_id}
      />
    </div>
  );
};

export default HistoriaClinica;
