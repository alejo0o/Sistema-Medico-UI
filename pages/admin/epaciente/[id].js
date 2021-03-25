import axios from 'axios';

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

const index = () => {
  return <div></div>;
};

export default index;
