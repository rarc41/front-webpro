import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import AgregarAvance from "./AgregarAvance";
import EditarAvance from "./EditarAvance";

const OBTENER_AVANCES = gql`
  query obtenerAvancesProyecto($proyecto: ID!) {
    obtenerAvancesProyecto(proyecto: $proyecto) {
      id
      fechaAvance
      descripcion
      observaciones
      creadoPor
    }
  }
`;

const Avances = ({ handleClose, proyect, usuario }) => {
  const [modal, setModal] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [avance, setAvance] = useState([]);

  const { data, loading, error } = useQuery(OBTENER_AVANCES, {
    variables: { proyecto: proyect.id,
      fetchPolicy: "network-only"},
  });
  console.log(data);

  const functionClick = (e) => {
    setShow(true);
    const avance = data.obtenerAvancesProyecto.filter(
      (avance) => avance.id === e.target.id
    );
    setAvance(avance);
  };

  if (loading) return "Cargando...";

  return (
    <>
      <div
        className="min-w-screen h-screen animated fadeIn faster fixed flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-10 inset-0 z-0"></div>
        <div className="w-auto p-5 relative rounded-xl shadow-lg  bg-white ">
          <div className="">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Avances del Proyecto
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium hover:bg-yellow-500 text-gray-500 uppercase tracking-wider"
                            >
                              Fecha Avance
                            </th>
                            {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th> */}
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium hover:bg-yellow-500 text-gray-500 uppercase tracking-wider"
                            >
                              Descripción
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium hover:bg-yellow-500 text-gray-500 uppercase tracking-wider"
                            >
                              Observaciones
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium hover:bg-yellow-500 text-gray-500 uppercase tracking-wider"
                            >
                              Creado Por
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data.obtenerAvancesProyecto.map((avance) => (
                            <tr key={avance.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {avance.fechaAvance}
                              </td>
                              {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.title}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
                    </td> */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {avance.descripcion}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {avance.observaciones}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {avance.creadoPor}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  id={avance.id}
                                  type="submit"
                                  className="bg-black my-3 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-900"
                                  onClick={(e) => functionClick(e)}
                                >
                                  Editar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-end mt-3">
              <button
                className="group relative w-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                onClick={() => setModal(true)}
              >
                Agregar Avance
              </button>
              <button
                type="button"
                className="group relative w-auto flex justify-center ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                onClick={handleClose}
              >
                Cancelar
              </button>
              {modal && (
                <AgregarAvance
                  handleClose={() => setModal(false)}
                  proyecto={proyect} usuario={usuario}
                />
              )}
                {show && (
                <EditarAvance
                  handleClose={() => setShow(false)}
                  proyecto={proyect} avance={avance} usuario={usuario}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avances;
