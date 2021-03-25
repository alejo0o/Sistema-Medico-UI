import axios from 'axios';
import { useState } from 'react';
import NuevoPaciente from '../../../components/Admin/Forms/CrearPaciente';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import ModalSuccess from '../../../components/Admin/Modales/CreaciónExitosa';
import ModalError from '../../../components/Admin/Modales/ErrorCreacion';

export const getStaticProps = async (ctx) => {
  const { data: etnias } = await axios.get(`${process.env.apiURL}/etnias`);
  const { data: niveles_instruccion } = await axios.get(
    `${process.env.apiURL}/nivelesdeinstruccion`
  );
  const { data: tipos_sangre } = await axios.get(
    `${process.env.apiURL}/tiposdesangre`
  );
  const { data: estados_civiles } = await axios.get(
    `${process.env.apiURL}/estadosciviles`
  );

  return {
    props: {
      etnias,
      niveles_instruccion,
      tipos_sangre,
      estados_civiles,
    },
  };
};

const index = ({
  etnias,
  niveles_instruccion,
  tipos_sangre,
  estados_civiles,
}) => {
  //Variables de estado de la pagina
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [paciente, setpaciente] = useState({
    tipo_de_sangre_id: '1',
    estado_civil_id: '1',
    nivel_de_instruccion_id: '1',
    etnia_id: '1',
  });
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  //Maneja los cambios dentro de la variable paciente
  const handleChange = (event) => {
    setpaciente({
      ...paciente,
      [event.target.name]: event.target.value,
    });
  };
  //Realiza el submit (post) del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    try {
      const response = await axios.post(
        `${process.env.apiURL}/pacientes`,
        paciente
      );
      if (response.status == 201) {
        setloading(false);
        setmodalSuccess(true);
      }
    } catch (Error) {
      seterror(Error);
      setmodalError(true);
      setloading(false);
    }
  };

  return (
    <AdminLayout>
      <NuevoPaciente
        etnias={etnias}
        niveles_instruccion={niveles_instruccion}
        tipos_sangre={tipos_sangre}
        estados_civiles={estados_civiles}
        handleSubmit={handleSubmit}
        handleaChange={handleChange}
      />
      {/*----------Modal de creacion exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
      />
      {/*----------Modal de error en creación------- */}
      <ModalError show={modalError} handleClose={() => setmodalError(false)} />
    </AdminLayout>
  );
};

export default index;
