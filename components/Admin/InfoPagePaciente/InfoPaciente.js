import { Columna, Fila, Boton } from './InfoPacienteStyle';
import Link from 'next/link';

const InfoGroup = ({ labelName, info }) => {
  return (
    <Columna>
      <label>
        <strong>{labelName} </strong>
      </label>
      <p>{info}</p>
    </Columna>
  );
};

const InfoPaciente = ({ handleClose, paciente, getEdad }) => {
  return (
    <div className='p-3'>
      <h2 className='mb-3'>{`${paciente.nombres} ${paciente.apellidos}`}</h2>

      <Link href='#'>
        <Boton className='btn mb-3'>Historial Clinico</Boton>
      </Link>

      <Columna>
        <Fila>
          <InfoGroup labelName='Nombres' info={paciente.nombres} />
          <InfoGroup labelName='Apellidos' info={paciente.apellidos} />
          <InfoGroup labelName='Cedula' info={paciente.cedula} />
        </Fila>
        <Fila>
          <InfoGroup
            labelName='Fecha de Nacimiento'
            info={`${paciente.fechanacimiento}
              (${getEdad(paciente.fechanacimiento)} años)`}
          />
          <InfoGroup
            labelName='Lugar de nacimiento'
            info={paciente.lugarnacimiento}
          />
          <InfoGroup labelName='Dirección' info={paciente.direccion} />
        </Fila>
        <Fila>
          <InfoGroup labelName='Telefono' info={paciente.telefono} />
          <InfoGroup labelName='Ocupación' info={paciente.ocupacion} />
          <InfoGroup labelName='Numero de hijos' info={paciente.numero_hijos} />
        </Fila>
        <Fila>
          <InfoGroup
            labelName='Tipo de Sangre'
            info={paciente.tipo_de_sangre_id}
          />
          <InfoGroup
            labelName='Nivel de Instrucción'
            info={paciente.nivel_de_instruccion_id}
          />
          <InfoGroup labelName='Estado Civil' info={paciente.estado_civil_id} />
        </Fila>
        <Fila>
          <InfoGroup labelName='Etnia' info={paciente.etnia_id} />
          <InfoGroup
            labelName='Contaco de emergencia'
            info={paciente.contacto_emergencia_nombre}
          />
          <InfoGroup
            labelName='Contacto emergencia (#num)'
            info={paciente.contacto_emergencia_telefono}
          />
        </Fila>
      </Columna>
    </div>
  );
};

export default InfoPaciente;
