import React from "react";

const NavProyectos = ({ filter, setFilter }) => {
  return (
    <div className="px-6 pt-4">
      <ul className="flex">
        <li
          className={`text-gray-500 hover:text-white ${
            filter === "todos" && "text-white"
          }`}
        >
          <a
            href="#"
            className={`inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-yellow-300 focus:outline-none focus:ring-1 ${
              filter === "todos" && "bg-gray-800"
            }`}
            onClick={() => setFilter("todos")}
          >
            Todos Los Proyectos
          </a>
        </li>
        <li
          className={`text-gray-500 hover:text-white ${
            filter === "mis proyectos" && "text-white"
          }`}
        >
          <a
            href="#"
            className={`inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-yellow-300 focus:outline-none focus:ring-1 ${
              filter === "mis proyectos" && "bg-gray-800"
            }`}
            onClick={() => setFilter("mis proyectos")}
          >
            Mis proyectos
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavProyectos;
