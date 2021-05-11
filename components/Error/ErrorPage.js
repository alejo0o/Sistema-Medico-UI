import Link from 'next/link';
import { Boton } from '../CommonStyles/CommonStyles';

const ErrorPage = ({ code = '404' }) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center w-100'
      style={{
        minHeight: '100vh',
        maxHeight: 'auto',
        backgroundColor: '#0E86D4',
      }}>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Abel&display=swap'
        rel='stylesheet'
      />
      <div
        className='w-50 h-50 text-white'
        style={{ fontFamily: 'Abel, sans-serif', fontWeight: 'bolder' }}>
        <div className='text-center'>
          <div className='d-flex align-items-center justify-content-center'>
            <h2 style={{ fontSize: '8em' }}>{code[0]}</h2>
            <div className='d-flex' style={{ fontSize: '8em' }}>
              <i className='far fa-question-circle fa-spin'></i>
            </div>
            <h2 style={{ fontSize: '8em' }}>{code[0]}</h2>
          </div>
          <p style={{ fontSize: '1.5em' }}>
            {code === '404'
              ? `La página que busca no existe. Cómo llego aquí es un misterio. Pero
            puede hacer clic en el botón de abajo para volver a la página de
            inicio.`
              : `dd`}
          </p>
          <Link href='/'>
            <Boton color='blue-login'>Home</Boton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
