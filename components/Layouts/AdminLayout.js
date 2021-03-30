import NavBar from '@/components/Admin/NavBar/NavBar';
import SideNav from '@/components/Admin/SideNav/SideNav';
import Hidden from '@material-ui/core/Hidden';

const AdminLayout = ({ children }) => {
  return (
    <div className='d-flex'>
      <Hidden only={['xs', 'sm']}>
        <SideNav />
      </Hidden>

      <div className='d-block w-100'>
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
