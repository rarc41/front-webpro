import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import MostrarProyecto from "./MostrarProyecto";
import FormCrearProyectos from "./FormCrearProyectos";
import { toast } from "react-toastify";
import StepperProgress from "./StepperProgress";
import NavProyectos from "./NavProyectos";
import Proyecto from "./Proyecto";

const OBTENER_PROYECTOS = gql`
  query ObtenerProyectos {
    obtenerProyectos {
      id
      nombreProyecto
      objetivoGeneral
      objetivosEspecificos
      presupuesto
      fechaInicio
      fechaFin
      estadoProyecto
      faseProyecto
      lider
    }
  }
`;

const ACTUALIZAR_ESTADO_PROYECTO = gql`
  mutation ActualizarProyectoEstado(
    $actualizarProyectoEstadoId: ID!
    $input: ActualizarProyectoInput!
  ) {
    actualizarProyectoEstado(id: $actualizarProyectoEstadoId, input: $input) {
      id
      nombreProyecto
      objetivoGeneral
      objetivosEspecificos
      presupuesto
      estadoProyecto
      lider
    }
  }
`;

const Proyectos = ({ usuario }) => {
  const [modal, setModal] = React.useState(false);
  const [showModal, setShow] = React.useState(false);
  const [proyecto, setProyecto] = useState([]);

  const [filter, setFilter] = useState("todos");

  const { data, loading, error } = useQuery(OBTENER_PROYECTOS, {
    fetchPolicy: "network-only",
  });

  const [actualizarProyectoEstado] = useMutation(ACTUALIZAR_ESTADO_PROYECTO);

  const handleActualizarEstado = async (e) => {
    e.preventDefault();
    const input = {
      estadoProyecto: e.target.value === "true" ? false : true,
      faseProyecto: e.target.value === "true" ? "TERMINADO" : "INICIADO",
    };
    try {
      await actualizarProyectoEstado({
        variables: {
          actualizarProyectoEstadoId: e.target.id,
          input,
        },
      });
      toast.success("Estado actualizado correctamente");
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const functionClick = (e) => {
    setShow(true);
    const proyect = data.obtenerProyectos.filter(
      (proyect) => proyect.id === e.target.id
    );
    setProyecto(proyect);
  };

  if (loading) return "Cargando...";

  return (
    <>
      {usuario.rol === "LIDER" && (
        <button
          type="submit"
          className="flex self-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          onClick={() => setModal(true)}
        >
          crear proyecto
        </button>
      )}

      <NavProyectos filter={filter} setFilter={setFilter}>
        
      </NavProyectos>

      {modal && <FormCrearProyectos handleClose={() => setModal(false)} />}
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-5">
        {filter === "todos" &&
          data.obtenerProyectos.map((proyect) => (
            <Proyecto
              key={proyect.id}
              proyect={proyect}
              functionClick={(e) => functionClick(e)}
              usuario={usuario}
              handleActualizarEstado={handleActualizarEstado}
            />
          ))}

        {filter === "mis proyectos" &&
          data.obtenerProyectos
            .filter((proyect) => proyect.lider === usuario.id)
            .map((proyect) => (
              <Proyecto
                key={proyect.id}
                proyect={proyect}
                functionClick={functionClick}
                usuario={usuario}
              />
            ))}
        {showModal && (
          <MostrarProyecto
            handleClose={() => setShow(false)}
            proyect={proyecto}
            usuario={usuario}
          />
        )}
      </div>
    </>
  );
};

export default Proyectos;
