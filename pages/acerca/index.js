import { useMediaQuery } from '@material-ui/core';
import Head from 'next/head';
//
import Layout from '@/components/Layouts/Layout';
import useUser from '@/components/utils/useUser';

const index = () => {
  const { user } = useUser();
  const matches = useMediaQuery('(max-width: 768px)');

  if (!user) return <></>;

  return (
    <Layout user={user}>
      <Head>
        <title>MediClinic | Acerca de</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <link rel='icon' href='/company.png' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Itim&display=swap'
          rel='stylesheet'
        />
      </Head>

      <div className='p-2'>
        <div className='w-100 text-center'>
          <div
            className='w-75'
            style={{
              margin: '0 auto',
              color: '#E8EEF1',
              fontFamily: 'Itim, cursive',
            }}>
            {matches ? (
              <h2>
                Prototipo de sistema de información para la gestión de
                consultorios médicos de diferentes especialidades
              </h2>
            ) : (
              <h1>
                Prototipo de sistema de información para la gestión de
                consultorios médicos de diferentes especialidades
              </h1>
            )}
          </div>
        </div>
        <div className='w-100 d-flex justify-content-center'>
          <div
            className={`${
              matches ? 'w-100' : 'w-75'
            } d-flex justify-content-center`}>
            <img
              className={`${matches ? 'w-75' : 'w-50'} h-100`}
              src='doctors.png'
            />
          </div>
        </div>
        <div className='w-100 text-justify text-white'>
          <div
            className='w-75'
            style={{
              margin: '0 auto',
              fontFamily: 'Itim, cursive',
              fontSize: matches ? '1em' : '1.3em',
            }}>
            <h5 className='text-center'>
              Sistema desarrollado como disertación final del alumno Alejandro
              Manuel Vivanco Mosquera.
            </h5>
            <h1>Autor</h1>
            <h3>Alejandro Vivanco</h3>
            <p>
              Soy estudiante de Ingeniería en Sistemas en la Pontificia
              Universidad Católica del Ecuador. Tengo 22 años y me especializo
              en el desarrollo de aplicaciones web y móviles. Disfruto aprender
              cada día más sobre el mundo del desarrollo y espero crear diversos
              sistemas profesionales a lo largo de mi carrera. <br />
              Para conocer más de mi, visita mi portafolio:{' '}
              <a
                href='https://portafolio-alejandro-vivanco.vercel.app'
                rel='noreferrer'
                target='_blank'
                style={{ textDecoration: 'none', color: '#fff' }}>
                Alejandro Vivanco-Portafolio
              </a>
            </p>
          </div>
          <div>
            <div
              className='w-75'
              style={{
                margin: '0 auto',
                fontFamily: 'Itim, cursive',
                fontSize: matches ? '1em' : '1.3em',
              }}>
              <h1>Pontificia Universidad Católica del Ecuador</h1>
              <p>
                Fundada en 1946 por la Compañía de Jesús y por el Sr. Arzobispo
                de Quito, Card. Carlos María de la Torre, la Pontificia
                Universidad Católica del Ecuador es una institución de educación
                superior y también la universidad privada más antigua de la
                República del Ecuador.
                <br />
                Para conocer más de la PUCE, visita:{' '}
                <a
                  href='https://www.puce.edu.ec'
                  rel='noreferrer'
                  target='_blank'
                  style={{ textDecoration: 'none', color: '#fff' }}>
                  Pontificia Universidad Católica del Ecuador
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
