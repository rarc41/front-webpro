import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import ConfirmarInscripcion from "./ConfirmarInscripcion";
import Avances from "./Avances";
import { useRouter } from "next/router";

const OBTENER_PROYECTOS = gql`
  query ObtenerProyectos {
    obtenerProyectos {
      id
      nombreProyecto
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

toast.configure();
const MostrarProyecto = ({ handleClose, proyect, usuario }) => {
  const proyecto = proyect[0]
  // estate para mostrar modal
  const [modal, setModal] = React.useState(false);
  const [showModal, setShow] = React.useState(false);
  const router = useRouter();

  return (
    <>
        <div>
         <div
        className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-10 inset-0 z-0"></div>
        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Información del Proyecto
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    {proyecto.nombreProyecto}
                  </p>
                </div>
                <div>
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Objetivos Especificos
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.objetivosEspecificos}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Presupuesto
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.presupuesto}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Fecha de Inicio
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.fechaInicio}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Fecha de Fin
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.fechaFin}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Estado</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.estadoProyecto}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Fase del Proyecto
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.faseProyecto}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Lider del Proyecto
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {proyecto.lider}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="flex justify-center items-center mt-3">
                <button
                  className="group relative w-full flex justify-center mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                  onClick={() => setModal(true)}
                >
                  Inscribirse
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                  onClick={() => setShow(true)}
                >
                  Avances
                </button>
                <button
                  type="button"
                  className="group relative w-full flex justify-center ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                {modal && (
                  <ConfirmarInscripcion handleClose={() => setModal(false)} proyecto={proyecto}/>
                )}
                 {showModal && (
                  <Avances handleClose={() => setShow(false)} proyect={proyecto} usuario={usuario}/>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
    </>
  );
};

export default MostrarProyecto;
