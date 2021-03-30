import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import NuevaHistoria from '@/components/Admin/Forms/CrearHistoriaClinica';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getServerSideProps = async ({ params }) => {
  const { data: paciente } = await axios.get(
    `${process.env.apiURL}/pacientes/${params?.id}`
  );

  return {
    props: {
      paciente,
    },
  };
};

const index = ({ paciente }) => {
  //----------Variables de estado de la pagina---------//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [historia_clinica, sethistoria_clinica] = useState({
    //estado previo de la variable
    paciente_id: paciente.paciente_id,
    alergias: '',
    antecedentes_patologicos: '',
    antecedentes_quirurgicos: '',
    antecedentes_familiares: '',
    medicamentos_subministrados: '',
    gestas: '',
    partos: '',
    cesareas: '',
    abortos: '',
    metodo_anticonceptivo: '',
    habitos: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  //----------------Props de la pagina---------------//
  const router = useRouter();
  //--------------Funciones de la página-----------//
  //Maneja los cambios dentro de la variable historia_clinica
  const handleChange = (event) => {
    sethistoria_clinica({
      ...historia_clinica,
      [event.target.name]: event.target.value,
    });
  };

  //Realiza el submit (post) del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    try {
      const response = await axios.post(
        `${process.env.apiURL}/historiasclinicas`,
        historia_clinica
      );
      if (response.status == 201) {
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
      <NuevaHistoria
        handleSubmit={handleSubmit}
        handleaChange={handleChange}
        paciente={paciente}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='La historia clínica se ha creado satisfactoriamente!'
        redireccion={`/admin/paciente/historia/${paciente.paciente_id}`}
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
