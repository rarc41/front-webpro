import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const OBTENER_INSCRIPCIONES = gql`
  query ObtenerInscripcionesLider {
    obtenerInscripcionesLider {
      id
      proyecto {
        id
        nombreProyecto
        estadoProyecto
        faseProyecto
      }
      estudiante {
        id
        nombre
        apellido
        identificacion
        email
        rol
        estado
      }
      estado
      fechaIngreso
      fechaEgreso
    }
  }
`;

const ACTUALIZAR_ESTADO_INSCRIPCION = gql`
  mutation actualizarInscripcionEstadoId(
    $actualizarInscripcionEstadoId: ID!
    $estado: Boolean!
  ) {
    actualizarInscripcionEstado(
      id: $actualizarInscripcionEstadoId
      estado: $estado
    ) {
      id
      proyecto {
        id
      }
      estudiante {
        id
      }
      estado
      fechaIngreso
      fechaEgreso
    }
  }
`;

const Inscripciones = () => {
  // state pra el mensaje
  // consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_INSCRIPCIONES);
  const [actualizarInscripcionEstadoId] = useMutation(
    ACTUALIZAR_ESTADO_INSCRIPCION
  );

  const handleActualizarEstado = async (e) => {
    e.preventDefault();
    console.log(typeof e.target.value);
    const input = {
      estado: e.target.value === "true" ? false : true,
    };
    try {
      await actualizarInscripcionEstadoId({
        variables: {
          actualizarInscripcionEstadoId: e.target.id,
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

  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return "Cargando...";

  return (
    <div class="bg-white p-8 rounded-md w-full">
      <div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha Ingreso
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider">
                    Editar
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {data.obtenerInscripcionesLider.map((inscripcion) => (
                  <>
                    <tr key={inscripcion.id} class="hover:bg-gray-500">
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-10 h-10">
                            <img
                              class="w-full h-full rounded-full"
                              src="https://cdn5.vectorstock.com/i/thumb-large/82/59/anonymous-user-flat-icon-vector-18958259.jpg"
                              alt=""
                            />
                          </div>
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {inscripcion.estudiante.nombre}{" "}
                              {inscripcion.estudiante.nombre}
                            </p>
                            <div class="text-sm text-gray-500">
                              {inscripcion.estudiante.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {inscripcion.proyecto.nombreProyecto}
                            </p>
                            <div class="text-sm text-gray-500">
                              {inscripcion.proyecto.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {inscripcion.fechaIngreso}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button className="flex absolute z-10 right-2.5 top-2.5 ">
                          <svg
                            className="ml-8 h-6 w-6 text-gray-500 hover:text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>

                        <button
                          id={inscripcion.id}
                          type="button"
                          value={inscripcion.estado}
                          className={`${
                            inscripcion.estado ? "bg-red-600" : "bg-green-600"
                          } w-20 h-9 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-900`}
                          onClick={handleActualizarEstado}
                        >
                          {inscripcion.estado ? "Rechazar" : "Aprobar"}
                        </button>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p>
                          Estado Actual:{" "}
                          <span
                            className={`px-2  inline-flex text- leading-5 font-semibold rounded-full  ${
                              inscripcion.estado ? "bg-green-600" : "bg-red-600"
                            } text-white`}
                          >
                            {inscripcion.estado ? "Aprobado" : "Rechazado"}
                          </span>
                        </p>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <div class="inline-flex mt-2 xs:mt-0">
                <button class="group relative w-full flex justify-center ml-2  py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                  Anterior
                </button>
                &nbsp; &nbsp;
                <button class="group relative w-full flex justify-center ml-2  py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscripciones;
