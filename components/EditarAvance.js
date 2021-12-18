import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const ACTUALIZAR_AVANCE = gql`
  mutation actualizarAvance($id: ID!, $input: AvanceInput!) {
    actualizarAvance(id: $id, input: $input) {
      id
      descripcion
      observaciones
    }
  }
`;

toast.configure();
const MostrarProyecto = ({ handleClose, proyecto, avance, usuario }) => {
  avance = avance[0];
  const [actualizarAvance] = useMutation(ACTUALIZAR_AVANCE, {
    fetchPolicy: "network-only",
  });

  // validacion del formulario
  const formik = useFormik({
    initialValues: {
      descripcion: avance.descripcion,
      observaciones: avance.observaciones,
    },
    validationSchema: Yup.object({
     
    }),
    onSubmit: async (valores) => {
      const { descripcion, observaciones } = valores;

      try {
        const { data } = await actualizarAvance({
          variables: {
            id: avance.id,
            input: {
              descripcion,
              observaciones,
            },
          },
        });
        toast.success("Se actualizó avance", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
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
      handleClose();
    },
  });

  return (
    <>
      <div>
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-10 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="flex justify-center items-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Actualizar Avance
              </h3>
            </div>
            <div className="flex justify-center items-center">
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {proyecto.nombreProyecto}
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col justify-center items-center">
                {usuario.rol === "ESTUDIANTE" && (
                  <label htmlFor="descripcion">
                    Descripción
                    <input
                      name="descripcion"
                      id="descripcion"
                      type="text"
                      // className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 ${
                        formik.errors.descripcion ? "border-red-500" : ""
                      } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm`}
                      placeholder="PENDIENTE"
                      value={formik.values.descripcion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span>
                      {formik.errors.descripcion ? (
                        <div className="text-red-500 text-xs italic">
                          {formik.errors.descripcion}
                        </div>
                      ) : null}
                    </span>
                  </label>
                )}
                {usuario.rol === "LIDER" && (
                  <label htmlFor="observaciones">
                    Observaciones
                    <input
                      name="observaciones"
                      id="observaciones"
                      type="text"
                      // className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 ${
                        formik.errors.observaciones ? "border-red-500" : ""
                      } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm`}
                      placeholder="PENDIENTE"
                      value={formik.values.observaciones}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span>
                      {formik.errors.observaciones ? (
                        <div className="text-red-500 text-xs italic">
                          {formik.errors.observaciones}
                        </div>
                      ) : null}
                    </span>
                  </label>
                )}
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="group relative w-full flex justify-center ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MostrarProyecto;