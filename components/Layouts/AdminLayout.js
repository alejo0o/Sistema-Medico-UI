import { useState } from 'react';
import Drawer from '@/components/Admin/Drawer/SideDrawer';
import NavBar from '@/components/Admin/NavBar/NavBar';

const AdminLayout = ({ children, miniDrawer }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className='d-flex' style={{ maxHeight: 'auto', minHeight: '100vh' }}>
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        miniDrawer={miniDrawer}
      />
      <div className='w-100 pb-3'>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
