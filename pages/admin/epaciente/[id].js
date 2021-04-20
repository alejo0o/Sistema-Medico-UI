import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import EditarPaciente from '@/components/Admin/Forms/EditarPaciente';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';
//Auth
import withSession from '@/components/utils/session';
import axios from '@/components/utils/axios-helper';

export const getServerSideProps = withSession(async ({ params, req }) => {
  //Revisa si el usuario esta seteado antes de hacer la petición
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  //Obtiene el paciente con el id indicado
  const { data: paciente } = await axios(user.token).get(
    `/v1/pacientes/${params?.id}`
  );
  if (!paciente)
    return {
      notFound: true,
    };
  //--------Extrae los valores de etnias,educación,sangre y estado civil----//
  const { data: etnias } = await axios(user.token).get(`/v1/etnias`);
  const { data: niveles_instruccion } = await axios(user.token).get(
    `/v1/nivelesdeinstruccion`
  );
  const { data: tipos_sangre } = await axios(user.token).get(
    `/v1/tiposdesangre`
  );
  const { data: estados_civiles } = await axios(user.token).get(
    `/v1/estadosciviles`
  );
  const { data: generos } = await axios(user.token).get(`/v1/generos`);

  //Retira los espacios innecesarios que traen los datos
  Object.keys(paciente).forEach(function (key) {
    paciente[key] = paciente[key] == null ? '' : String(paciente[key]).trim();
  });

  return {
    props: {
      paciente,
      etnias,
      niveles_instruccion,
      tipos_sangre,
      estados_civiles,
      generos,
      user,
    },
  };
});

const index = ({
  etnias,
  niveles_instruccion,
  tipos_sangre,
  estados_civiles,
  generos,
  paciente,
  user,
}) => {
  //-----Variables de estado de la página-----//
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  //-----Funciones de la página---------//

  //Maneja la petición de editar
  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).put(
        `/v1/pacientes/${paciente.paciente_id}`,
        values
      );
      if (response.status == 200) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
    }
  };
  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <EditarPaciente
        tipos_sangre={tipos_sangre}
        estados_civiles={estados_civiles}
        niveles_instruccion={niveles_instruccion}
        etnias={etnias}
        generos={generos}
        handleSubmit={handleSubmit}
        paciente={paciente}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='Se ha editado la información del paciente satisfactoriamente!'
        redireccion='/admin/pacientes'
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Se ha producido un error revise los datos ingresados o intentelo más tarde'
      />
    </AdminLayout>
  );
};

export default index;
