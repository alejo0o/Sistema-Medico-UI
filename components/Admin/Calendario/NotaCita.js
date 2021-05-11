import {
  Nota,
  NotaCircle,
} from '@/components/Admin/Calendario/CalendarioStyles';

const NotaCita = ({ doctor, hora }) => {
  return (
    <Nota className='mb-2'>
      <div className='mr-1'>
        <i className='fas fa-map-pin' />
      </div>
      <span>{`${hora} - ${doctor}`}</span>
    </Nota>
  );
};

export default NotaCita;
