import { createContext, useContext } from 'react';
import useUser from '@/components/utils/useUser';

import axios from 'axios';
import useSWR from 'swr';

const AppContext = createContext();

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function AppWrapper({ children }) {
  const { user } = useUser();
  const { data: consultorio, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APIURL}/v1/consultorios/1`,
    fetcher
  );

  console.log('tantas veces');
  if (!user || !consultorio || error) return <></>;

  return (
    <AppContext.Provider value={{ user, consultorio }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
