import Navbar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const Layout = ({ children, consultorio, user }) => {
  const color = '#0E86D4';
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
