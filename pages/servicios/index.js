import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layouts/Layout';
import axios from 'axios';
import useSWR from 'swr';
import { Pagination } from '@material-ui/lab';
import { makeStyles, useMediaQuery } from '@material-ui/core';
//
import Loader from '@/components/Loader/Loader';
import ImagenTexto from '@/components/Servicios/ImagenTexto';
import TextoImagen from '@/components/Servicios/TextoImagen';
import { CustomHR } from '@/components/CommonStyles/CommonStyles';
import useUser from '@/components/utils/useUser';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
}));

const index = () => {
  const { user } = useUser();
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  const [page, setpage] = useState(1);

  const { data: servicios, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APIURL}/v1/servicios?page=${page}`,
    fetcher
  );

  if (!user) return <></>;

  return (
    <Layout user={user}>
      {servicios &&
        servicios.data.map((servicio, i) =>
          i % 2 === 0 ? (
            <div key={servicio.servicio_id}>
              <TextoImagen servicio={servicio} />
              <CustomHR />
            </div>
          ) : (
            <div key={servicio.servicio_id}>
              {matches ? (
                <TextoImagen servicio={servicio} />
              ) : (
                <ImagenTexto servicio={servicio} />
              )}
              <CustomHR />
            </div>
          )
        )}
      {!servicios && <Loader />}
      <div className='d-flex pb-3 pt-3'>
        {servicios && (
          <Pagination
            style={{ margin: '0 auto' }}
            classes={{ ul: classes.ul }}
            showFirstButton
            showLastButton
            size={matches ? 'small' : 'medium'}
            color='primary'
            variant='outlined'
            page={page}
            count={servicios.meta.last_page}
            onChange={(event, value) => {
              setpage(value);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default index;
