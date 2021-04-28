import { LoaderContainer } from './LoaderStyle';
const Loader = ({ color }) => {
  return (
    <LoaderContainer
      className='d-flex justify-content-center align-items-center'
      color={color}
      style={{ height: '75vh' }}>
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
