import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const EDITAR_ESTADO_USUARIO = gql`
  mutation actualizarUsuarioEstado($id: ID!, $estado: EstadoUsuario!) {
    actualizarUsuarioEstado(id: $id, estado: $estado) {
      id
      estado
    }
  }
`;

toast.configure();
const MostrarProyecto = ({ handleClose, user }) => {
  const usuario = user[0];

  const [actualizarUsuarioEstado] = useMutation(EDITAR_ESTADO_USUARIO);

  // validacion del formulario
  const formik = useFormik({
    initialValues: {
      estado: "",
    },
    validationSchema: Yup.object({
      estado: Yup.string().required("El estado es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const { estado } = valores;

      try {
        const { data } = await actualizarUsuarioEstado({
          variables: {
            id: usuario.id,
            estado: estado,
          },
        });
        toast.success("estado actualizado Correctamente", {
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
      handleClose()
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
                Actualizar 
              </h3>
            </div>
            <div className="flex justify-center items-center">
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {usuario.nombre}
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
              <div className="flex justify-center items-center">
                <label htmlFor="estado">
                  ESTADO
                  <input
                    name="estado"
                    id="estado"
                    type="text"
                    // className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 ${
                      formik.errors.estado ? "border-red-500" : ""
                    } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm`}
                    placeholder="PENDIENTE"
                    value={formik.values.estado}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span>
                    {formik.errors.estado ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.estado}
                      </div>
                    ) : null}
                  </span>
                </label>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Actualizar
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
