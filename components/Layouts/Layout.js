import Navbar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import useSWR from 'swr';
import Loader from '../Loader/Loader';
import axios from 'axios';
import ErrorPage from '../Error/ErrorPage';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Layout = ({ children, user }) => {
  const color = '#0E86D4';
  const { data: consultorio, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APIURL}/v1/consultorios/1`,
    fetcher
  );

  if (error) return <ErrorPage code={error.response.status} />;

  if (!consultorio) return <Loader color='black' />;

  return (
    <div>
      <div
        style={{
          background: color,
          minHeight: '92vh',
          maxHeight: 'auto',
        }}>
        <Navbar logo={consultorio.logo} user={user} color={color} />
        {children}
      </div>
      <Footer consultorio={consultorio} />
    </div>
  );
};

export default Layout;
