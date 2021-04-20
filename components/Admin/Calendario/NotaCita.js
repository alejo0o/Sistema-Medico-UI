import {
  Nota,
  NotaCircle,
} from '@/components/Admin/Calendario/CalendarioStyles';

const NotaCita = ({ doctor, hora, color }) => {
  return (
    <Nota className='mb-2'>
      <NotaCircle style={{ background: `${color}` }} />
      <span>{`${hora} - ${doctor}`}</span>
    </Nota>
  );
};

export default NotaCita;
