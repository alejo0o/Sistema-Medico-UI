import { useState } from 'react';
import useSWR from 'swr';
import Drawer from '@/components/Admin/Drawer/SideDrawer';
import NavBar from '@/components/Admin/NavBar/NavBar';
import Loader from '../Loader/Loader';
import ErrorPage from '../Error/ErrorPage';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const AdminLayout = ({ children, miniDrawer }) => {
  const { data: consultorio, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APIURL}/v1/consultorios/1`,
    fetcher
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (error) return <ErrorPage code={error.response.status} />;

  if (!consultorio) return <Loader color='black' />;

  return (
    <div className='d-flex' style={{ maxHeight: 'auto', minHeight: '100vh' }}>
      <Drawer
        logo={consultorio.logo}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        miniDrawer={miniDrawer}
      />
      <div className='w-100 pb-3'>
        <NavBar
          handleDrawerToggle={handleDrawerToggle}
          consultorio_nombre={consultorio.nombre}
        />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
