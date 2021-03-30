import NavBar from '@/components/Admin/NavBar/NavBar';
import SideNav from '@/components/Admin/SideNav/SideNav';

const AdminLayout = ({ children }) => {
  return (
    <div className='d-flex'>
      <SideNav />
      <div className='d-block w-100'>
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
