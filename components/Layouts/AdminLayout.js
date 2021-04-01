import { useState } from 'react';
import Drawer from '@/components/Admin/Drawer/SideDrawer';
import NavBar from '@/components/Admin/NavBar/NavBar';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className='d-flex'>
      <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <div className='w-100'>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
