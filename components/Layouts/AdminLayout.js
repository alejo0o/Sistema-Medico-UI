import { useState } from 'react';
import Drawer from '@/components/Admin/Drawer/SideDrawer';
import NavBar from '@/components/Admin/NavBar/NavBar';
import DrawerSkeleton from '@/components/Admin/Skeletons/DrawerSkeleton';
import NavbarSkeleton from '@/components/Admin/Skeletons/NavbarSkeleton';

const AdminLayout = ({ children, loading }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className='d-flex'>
      {loading ? (
        <DrawerSkeleton />
      ) : (
        <Drawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
      <div className='w-100'>
        {loading ? (
          <NavbarSkeleton />
        ) : (
          <NavBar handleDrawerToggle={handleDrawerToggle} />
        )}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
