import Link from 'next/link';
const index = () => {
  return (
    <div>
      pagina principal
      <br />
      <Link href='/admin/pacientes'>
        <a>Pacientes</a>
      </Link>
    </div>
  );
};

export default index;
