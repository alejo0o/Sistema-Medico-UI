import AdminLayout from '@/components/Layouts/AdminLayout';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useMediaQuery } from '@material-ui/core';
//
import Negativa from '@/components/Admin/Consentimiento/Negativa';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import useUser from '@/components/utils/useUser';
import ConsentimientoSkeleton from '@/components/Admin/Skeletons/ConsentimientoSkeleton';
import LayoutSkeleton from '@/components/Admin/Skeletons/LayoutSkeleton';

const index = () => {
  const { user } = useUser({ redirectTo: '/login' });
  const matches = useMediaQuery('(max-width: 768px)');
  const componentRef = useRef();

  if (!user || user.isLoggedIn === false)
    return (
      <LayoutSkeleton>
        <ConsentimientoSkeleton />
      </LayoutSkeleton>
    );

  return (
    <AdminLayout>
      <Negativa
        ref={componentRef}
        columna={matches ? '4' : ''}
        columna2={matches ? '6' : ''}
      />
      <ReactToPrint
        trigger={() => (
          <div className='d-flex justify-content-center'>
            <Boton size='lg'>Imprimir</Boton>
          </div>
        )}
        content={() => componentRef.current}
      />
    </AdminLayout>
  );
};

export default index;
