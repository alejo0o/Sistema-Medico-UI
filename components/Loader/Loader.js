import { LoaderContainer } from './LoaderStyle';
const Loader = () => {
  return (
    <LoaderContainer
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderContainer>
  );
};

export default Loader;
