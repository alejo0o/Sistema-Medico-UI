import Link from 'next/link';
import { Boton } from '../../CommonStyles/CommonStyles';
import { AlergiasContainer } from './HistoriaClinicaStyle';
import HistoriaInfo from './HistoriaClinicaTable';

const HistoriaClinica = ({ historia_clinica }) => {
  return (
    <div className='p-3'>
      <h2>{`${historia_clinica.nombres} ${historia_clinica.apellidos}`}</h2>
      <h4>{`CI: ${historia_clinica.cedula}`}</h4>
      <Link
        href={`/admin/paciente/historia/evoluciones/${historia_clinica.paciente_id}`}>
        <Boton className='btn mb-3 mt-1'>Evoluciones</Boton>
      </Link>
      <AlergiasContainer className='p-3'>
        <h5>
          <strong>Alergias:</strong>
        </h5>
        <p>{historia_clinica.alergias}</p>
      </AlergiasContainer>
      <HistoriaInfo historia_clinica={historia_clinica} />
    </div>
  );
};

export default HistoriaClinica;
