import useSWR from 'swr';
import axios from '@/components/utils/axios-helper';

const fetchWithToken = (url, token) =>
  axios(token)
    .get(url)
    .then((res) => res.data);

export default function swrHook(url, token) {
  const { data, error } = useSWR(
    () => (token ? [url, token] : null),
    fetchWithToken
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
