import Link from 'next/link';
import Layout from '@/components/Layouts/Layout';
import axios from 'axios';
import { Boton } from '@/components/CommonStyles/CommonStyles';
import { useMediaQuery } from '@material-ui/core';
import useUser from '@/components/utils/useUser';

export const getStaticProps = async (ctx) => {
  const { data: consultorio } = await axios.get(
    `${process.env.NEXT_PUBLIC_APIURL}/v1/consultorios/1`
  );

  return {
    props: {
      consultorio,
    },
  };
};

const index = ({ consultorio }) => {
  const { user } = useUser();

  const matches = useMediaQuery('(max-width:768px)');

  if (!user) return <></>;

  return (
    <Layout consultorio={consultorio} user={user}>
      <div
        className={`${
          matches ? 'd-block' : 'd-flex'
        } h-100 align-items-center pl-5 pr-5 pt-5`}>
        <div
          className='text-white'
          style={{
            width: matches ? '100%' : '42%',
            textAlign: 'justify',
            textAlignLast: matches ? 'center' : '',
          }}>
          {matches ? (
            <h2>{consultorio.nombre}</h2>
          ) : (
            <h1>{consultorio.nombre}</h1>
          )}
          <p>{consultorio.descripcion}</p>
          <h4>Misión:</h4>
          <p>{consultorio.mision}</p>
          {user.isLoggedIn ? (
            <Link href='/admin/pacientes'>
              <Boton
                color='blue-login'
                size='lg'
                style={{ width: matches ? '100%' : 'auto' }}>
                Ingresar <i className='fas fa-sign-in-alt' />
              </Boton>
            </Link>
          ) : (
            <Link href='/login'>
              <Boton
                color='blue-login'
                size='lg'
                style={{ width: matches ? '100%' : 'auto' }}>
                Log In <i className='fas fa-sign-in-alt' />
              </Boton>
            </Link>
          )}
        </div>
        <div
          className={`${matches ? 'pt-5 pb-4' : ''} h-100 ml-auto`}
          style={{ width: matches ? '100%' : '55%' }}>
          <img src='mainimg.svg' className='w-100 h-100' />
        </div>
      </div>
    </Layout>
  );
};

export default index;
