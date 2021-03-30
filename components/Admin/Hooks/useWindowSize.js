import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    if (size.length == 0) handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size]);
  return size;
}

export default useWindowSize;
