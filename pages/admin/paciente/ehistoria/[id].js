import axios from 'axios';
import { useState, useEffect } from 'react';
import nProgress from 'nprogress';
//Componentes
import AdminLayout from '@/components/Layouts/AdminLayout';
import EditarHistoria from '@/components/Admin/Forms/EditarHistoriaClinica';
import ModalSuccess from '@/components/Admin/Modales/ModalSuccess';
import ModalError from '@/components/Admin/Modales/ModalError';

export const getServerSideProps = async ({ params }) => {
  //Obtiene el paciente con el id indicado
  const { data: paciente } = await axios.get(
    `${process.env.apiURL}/pacientes/${params?.id}`
  );
  //Obtiene la historia clinica del paciente indicado
  const { data: historiaClinica } = await axios.get(
    `${process.env.apiURL}/historiaclinicapaciente/${params?.id}`
  );

  if (!historiaClinica)
    return {
      notFound: true,
    };

  //Retira los espacios innecesarios que traen los datos
  Object.keys(historiaClinica).forEach(function (key) {
    historiaClinica[key] = String(historiaClinica[key]).trim();
  });

  return {
    props: {
      paciente,
      historiaClinica,
    },
  };
};

const index = ({ paciente, historiaClinica }) => {
  //----------Variables de estado de la pagina---------//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [historia_clinica, sethistoria_clinica] = useState({
    //estado previo de la variable
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

  //--------------Funciones de la página-----------//
  useEffect(() => {
    sethistoria_clinica(historiaClinica); //setea la historia a editar
  }, []);
  //Maneja los cambios dentro de la variable historia_clinica
  const handleChange = (event) => {
    sethistoria_clinica({
      ...historia_clinica,
      [event.target.name]: event.target.value,
    });
  };

  //Maneja la peticion de editar
  const handleSubmit = async (event) => {
    event.preventDefault();
    nProgress.start();
    try {
      const response = await axios.put(
        `${process.env.apiURL}/historiasclinicas/${historia_clinica.historia_clinica_id}`,
        historia_clinica
      );
      if (response.status == 200) {
        nProgress.done();
        setmodalSuccess(true);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      nProgress.done();
      setmodalError(true);
    }
  };

  return (
    <AdminLayout>
      <EditarHistoria
        paciente={paciente}
        historiaClinica={historia_clinica}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {/*----------Modal de peitición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='Se ha editado la información de la historia clínica satisfactoriamente!'
        redireccion={`/admin/paciente/historia/${paciente.paciente_id}`}
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
