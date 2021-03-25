//Librerias
import axios from 'axios';
import { useRouter } from 'next/router';
import LinearProgress from '@material-ui/core/LinearProgress';
//Componentes
import Loader from '../../../components/Loader/Loader';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import InfoPaciente from '../../../components/Admin/InfoPagePaciente/InfoPaciente';
import { getEdad } from '../../../components/utils/utils';

export const getStaticPaths = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.apiURL}/getpacientes`);

  const paths = data.map(({ paciente_id }) => ({
    params: { id: paciente_id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const { data: paciente } = await axios.get(
    `${process.env.apiURL}/pacientes/${params?.id}`
  );

  return {
    props: {
      paciente,
    },
    revalidate: 1, //se refresca cada 1 segundo
  };
};

const index = ({ paciente }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <AdminLayout>
        <LinearProgress />
        <Loader />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <InfoPaciente paciente={paciente} getEdad={getEdad} />
    </AdminLayout>
  );
};

export default index;
