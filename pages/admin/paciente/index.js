import axios from 'axios';
import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
//Componentes
import NuevoPaciente from '@/components/Admin/Forms/CrearPaciente';
import AdminLayout from '@/components/Layouts/AdminLayout';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getStaticProps = async () => {
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
  const { data: generos } = await axios.get(`${process.env.apiURL}/generos`);

  return {
    props: {
      etnias,
      niveles_instruccion,
      tipos_sangre,
      estados_civiles,
      generos,
    },
  };
};

const index = ({
  etnias,
  niveles_instruccion,
  tipos_sangre,
  estados_civiles,
  generos,
}) => {
  //-----Variables de estado de la página-----//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [paciente, setpaciente] = useState({
    //estado previo de la variable
    tipo_de_sangre_id: '1',
    estado_civil_id: '1',
    nivel_de_instruccion_id: '1',
    etnia_id: '1',
    genero_id: '1',
    apellidos: '',
    cedula: '',
    contacto_emergencia_nombre: '',
    contacto_emergencia_telefono: '',
    direccion: '',
    fechanacimiento: '',
    lugarnacimiento: '',
    nombres: '',
    numero_hijos: '',
    ocupacion: '',
    paciente_id: '',
    telefono: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  //-----Funciones de la página---------//
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
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
      setmodalError(true);
    }
  };

  return (
    <AdminLayout>
      {loading && <LinearProgress />}
      <NuevoPaciente
        etnias={etnias}
        niveles_instruccion={niveles_instruccion}
        tipos_sangre={tipos_sangre}
        estados_civiles={estados_civiles}
        generos={generos}
        handleSubmit={handleSubmit}
        handleaChange={handleChange}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El paciente se ha creado satisfactoriamente!'
        redireccion='/admin/pacientes'
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Revise que los datos ingresados sean correctos!'
      />
    </AdminLayout>
  );
};

export default index;
