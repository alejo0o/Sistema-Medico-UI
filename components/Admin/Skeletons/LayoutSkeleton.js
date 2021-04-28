import DrawerSkeleton from '@/components/Admin/Skeletons/DrawerSkeleton';
import NavBarSkeleton from '@/components/Admin/Skeletons/NavbarSkeleton';

const LayoutSkeleton = ({ children, miniDrawer }) => {
  return (
    <div className='d-flex' style={{ maxHeight: 'auto', minHeight: '100vh' }}>
      <DrawerSkeleton />
      <div className='w-100 pb-3'>
        <NavBarSkeleton />
        {children}
      </div>
    </div>
  );
};

export default LayoutSkeleton;
