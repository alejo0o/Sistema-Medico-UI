import Link from 'next/link';
import { ButtonContainer, ButtonsContainer } from './HistoriaClinicaStyle';
import { Button } from 'react-bootstrap';
import { Boton } from '@/components/CommonStyles/CommonStyles';

const ButtonDisplay = ({ pacienteId, handleModalDelete }) => {
  return (
    <ButtonsContainer>
      <ButtonContainer>
        <Link href={`/admin/paciente/historia/evoluciones/${pacienteId}`}>
          <Boton className='btn mb-3 mt-1'>
            Evoluciones <i className='fas fa-copy' />
          </Boton>
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link href={`/admin/paciente/ehistoria/${pacienteId}`}>
          <Button variant='info' className='btn mb-3 mt-1'>
            Editar Historia Clínica <i className='fas fa-edit' />
          </Button>
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Button
          variant='danger'
          className='btn mb-3 mt-1'
          onClick={() => {
            handleModalDelete();
          }}>
          Eliminar Historia Clínica <i className='fas fa-trash-alt' />
        </Button>
      </ButtonContainer>
    </ButtonsContainer>
  );
};

export default ButtonDisplay;
