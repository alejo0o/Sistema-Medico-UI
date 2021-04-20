import { IconMonth } from '@/components/Admin/Calendario/CalendarioStyles';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import { addMonths, subMonths } from 'date-fns';

const CalendarioHeader = ({
  setcurrentMonth,
  setselectedDate,
  month,
  year,
  currentMonth,
}) => {
  return (
    <>
      <div className='d-flex  justify-content-between align-items-center'>
        <IconMonth
          className='fas fa-chevron-left'
          onClick={() => setcurrentMonth(subMonths(currentMonth, 1))}
        />
        <h4 style={{ fontWeight: '700' }}>{`${month} ${year}`}</h4>
        <IconMonth
          className='fas fa-chevron-right'
          onClick={() => setcurrentMonth(addMonths(currentMonth, 1))}
        />
      </div>
    </>
  );
};

export default CalendarioHeader;
