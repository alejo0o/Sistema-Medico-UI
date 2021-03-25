import axios from 'axios';
import AdminLayout from '../../../../components/Layouts/AdminLayout';
import HistoriaClinica from '../../../../components/Admin/HistoriaClinica/HistoriaClinica';

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
  const { data: historia_clinica } = await axios.get(
    `${process.env.apiURL}/historiaclinicapaciente/${params?.id}`
  );

  return {
    props: {
      historia_clinica,
    },
    revalidate: 1, //se refresca cada 1 segundo
  };
};

const index = ({ historia_clinica }) => {
  return (
    <AdminLayout>
      <HistoriaClinica historia_clinica={historia_clinica} />
    </AdminLayout>
  );
};

export default index;
