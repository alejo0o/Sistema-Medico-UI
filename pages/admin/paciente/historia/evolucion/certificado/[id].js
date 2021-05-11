import AdminLayout from '@/components/Layouts/AdminLayout';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
//Auth
import Certificado from '@/components/Admin/Certificado/Certificado';
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';
import { Boton } from '@/components/CommonStyles/CommonStyles';

export const getServerSideProps = withSession(
  async ({ query: { id }, req }) => {
    //Revisa si el usuario esta seteado antes de hacer la petición
    const user = req.session.get('user');
    //Redirecciona si no existe un usuario logeado
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    //Redirecciona al usuario que no tiene los permisos adecuados
    if (user.tipo != 'medico' && user.tipo != 'admin') {
      return {
        redirect: {
          destination: '/admin/pacientes',
          permanent: false,
        },
      };
    }

    //Retorna las evoluciones del paciente con el id indicado
    const { data } = await axios(user.token).get(
      `/v1/evolucionxpaciente/${id}`
    );

    const { data: consultorio } = await axios(user.token).get(
      `/v1/consultorios/1`
    );

    if (!data || !consultorio)
      return {
        notFound: true,
      };

    const { data: medico } = await axios(user.token).get(
      `/v1/medicoxcedula/${user.cedula}`
    );

    return {
      props: {
        data,
        user,
        consultorio,
        medico,
      },
    };
  }
);

const index = ({ data, consultorio, medico }) => {
  const componentRef = useRef();

  return (
    <AdminLayout>
      <Certificado
        data={data}
        medico={medico}
        consultorio={consultorio}
        ref={componentRef}
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
