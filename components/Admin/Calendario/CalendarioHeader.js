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
        <h2 style={{ fontWeight: '700' }}>{`${month} ${year}`}</h2>
        <IconMonth
          className='fas fa-chevron-right'
          onClick={() => setcurrentMonth(addMonths(currentMonth, 1))}
        />
      </div>
      <div className='d-flex justify-content-center align-items-center mt-2 mb-2'>
        <Boton
          color='blue'
          onClick={() => {
            setselectedDate(new Date());
            setcurrentMonth(new Date());
          }}>
          <h5>Today</h5>
        </Boton>
      </div>
    </>
  );
};

export default CalendarioHeader;
