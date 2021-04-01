import Link from 'next/link';
import { ButtonContainer, ButtonsContainer } from './HistoriaClinicaStyle';
import { Button } from 'react-bootstrap';
import { Boton } from '@/components/CommonStyles/CommonStyles';

const ButtonDisplay = ({ pacienteId, handleModalDelete }) => {
  return (
    <ButtonsContainer>
      <ButtonContainer>
        <Link href={`/admin/paciente/historia/evoluciones/${pacienteId}`}>
          <a style={{ textDecoration: 'none' }}>
            <Boton color='blue' className='btn mb-3 mt-1'>
              Evoluciones <i className='fas fa-copy' />
            </Boton>
          </a>
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link href={`/admin/paciente/ehistoria/${pacienteId}`}>
          <a style={{ textDecoration: 'none' }}>
            <Boton color='green' className='btn mb-3 mt-1'>
              Editar Historia Clínica <i className='fas fa-edit' />
            </Boton>
          </a>
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Boton
          color='red'
          className='btn mb-3 mt-1'
          onClick={() => {
            handleModalDelete();
          }}>
          Eliminar Historia Clínica <i className='fas fa-trash-alt' />
        </Boton>
      </ButtonContainer>
    </ButtonsContainer>
  );
};

export default ButtonDisplay;
