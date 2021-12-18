import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import EditarUsuario from "./EditarUsuario";

const OBTENER_USUARIOS = gql`
  query {
    obtenerUsuarios {
      id
      nombre
      apellido
      identificacion
      email
      rol
      estado
      creado
    }
  }
`;

const people = [
  {
    name: "John",
    age: 25,
    email: "john@example.com",
    role: "Administrator",
  },
  {
    name: "John",
    age: 25,
    email: "john@example1.com",
    role: "Lider",
  },
  {
    name: "John",
    age: 25,
    email: "john@example2.com",
    role: "Estudiante",
  },
];
const Usuarios = () => {
  const [modal, setModal] = React.useState(false);
  const [usuario, setUsuario] = useState([]);
  // consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIOS);

  if (loading) return "Cargando...";

  const functionClick = (e) => {
    setModal(true);
    const person = data.obtenerUsuarios.filter(
      person => person.id === e.target.id
    );
    setUsuario(person)
  };

  return (
    <>
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
                      Nombre
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
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium hover:bg-yellow-500 text-gray-500 uppercase tracking-wider"
                    >
                      Rol
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.obtenerUsuarios.map((person) => (
                    <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                        </div> */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name} {person.apellido}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.title}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
                    </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {person.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.rol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          id={person.id}
                          type="submit"
                          className="bg-black my-3 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-gray-900"
                          onClick={(e) => functionClick(e)}
                        >
                          Editar
                        </button>
                        {modal && (
                          <EditarUsuario handleClose={() => setModal(false)} user={usuario}/>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usuarios;
