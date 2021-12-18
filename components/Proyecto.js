import React from "react";
import StepperProgress from "./StepperProgress";

const Proyecto = ({
  proyect,
  functionClick,
  usuario,
  handleActualizarEstado,
}) => {
  return (
    <div>
      <div
        className={`flex flex-col gap-x-5 bg-gray-300 mx-3 my-3 hover:bg-gray-100 w-4/5 h-auto items-center px-5 rounded-xl border-l-8 ${
          proyect.estadoProyecto ? "border-l-green-600" : "border-l-red-600"
        } relative`}
      >
        <button className="flex absolute z-10 right-2.5 top-2.5 ">
          <svg
            class="ml-8 h-6 w-6 text-gray-500 hover:text-gray-700"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </button>

        <div className="flex items-center mt-3">
          <h1 className="">{proyect.nombreProyecto}</h1>
        </div>

        <div className="px-1 pt-2">
          <hr className="border border-gray-400 w-40" />
        </div>
        <h2>{proyect.objetivoGeneral}</h2>

        <div className="flex w-full my-3">
          <p>
            Estado Actual:{" "}
            <span
              className={`px-3 py-1 inline-flex text- leading-5 font-semibold rounded-full  ${
                proyect.estadoProyecto ? "bg-green-600" : "bg-red-600"
              } text-white`}
            >
              {proyect.estadoProyecto ? "Activo" : "Inactivo"}
            </span>
          </p>
        </div>

        <div className="flex my-8 justify-around w-full">
          {usuario.rol === "ADMINISTRADOR" && (
            <button
              id={proyect.id}
              type="button"
              value={proyect.estadoProyecto}
              // className="bg-black w-20 h-9 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-900"
              className={`${
                proyect.estadoProyecto ? "bg-red-600" : "bg-green-600"
              } w-20 h-9 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-900`}
              onClick={handleActualizarEstado}
            >
              {proyect.estadoProyecto ? "Descativar" : "Activar"}
            </button>
          )}

          <button
            id={proyect.id}
            type="submit"
            className="bg-black xl:w-2/5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-900"
            onClick={functionClick}
          >
            Detalles
          </button>
        </div>
        <div className="my-3 flex w-full justify-center">
          <StepperProgress faseProyecto={proyect.faseProyecto} />
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
