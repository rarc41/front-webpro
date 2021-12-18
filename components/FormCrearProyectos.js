import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Field, FieldArray, Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

const NUEVO_PROYECTO = gql`
mutation CrearProyecto($input: ProyectoInput!) {
  CrearProyecto(input: $input) {
    id
    nombreProyecto
    objetivoGeneral
    objetivosEspecificos
    presupuesto
  }
}
`;

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

toast.configure();
const FormCrearProyectos = ({ handleClose }) => {
  // estate para mostrar modal

  const [crearProyecto] = useMutation(NUEVO_PROYECTO, {
    update(cache, { data: { CrearProyecto } }) {
      const { obtenerProyectos } = cache.readQuery({
        query: OBTENER_PROYECTOS,
      });

      // reescribir el cache
      cache.writeQuery({
        query: OBTENER_PROYECTOS,
        data: {
          obtenerProyectos: [CrearProyecto, ...obtenerProyectos],
        },
      });
    }
  });

  // Routin
  const router = useRouter();

  // validacion del formulario
  return (
    <>
      <div
        className=" min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div className="flex flex-col justify-center">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold py-4 ">
                Crear un Nuevo Proyecto
              </h2>
            </div>
            <Formik
              initialValues={{
                nombreProyecto: "",
                objetivoGeneral: "",
                objetivosEspecificos: [],
                presupuesto: "",
              }}
              validationSchema={Yup.object({
                nombreProyecto: Yup.string().required(
                  "El nombre es obligatorio"
                ),
                objetivoGeneral: Yup.string().required(
                  "El objetivo es obligatorio"
                ),
                objetivosEspecificos: Yup.array()
                  .required("agregue objetivos especificos")
                  .min(1, "agregue al menos un especifico"),
                presupuesto: Yup.string().required(
                  "El presupuesto es obligatoria"
                ),
              })}
              onSubmit={async (values) => {
                const {
                  nombreProyecto,
                  objetivoGeneral,
                  objetivosEspecificos,
                  presupuesto,
                } = values;
                try {
                  const { data } = await crearProyecto({
                    variables: {
                      input: {
                        nombreProyecto,
                        objetivoGeneral,
                        objetivosEspecificos,
                        presupuesto,
                      },
                    },
                  });
                  toast.success("Proyecto Creado Correctamente", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });

                  setTimeout(() => {
                    router.push("/");
                  }, 3000);
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
              }}
              render={({ values, errors }) => (
                <Form className="flex flex-col">
                  <div className="flex flex-col justify-center mt-2 mb-2">
                    <label htmlFor="nombreProyecto">Nombre del Proyecto</label>
                    <Field
                      name="nombreProyecto"
                      id="nombreProyecto"
                      className=" appearance-none rounded-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                    ></Field>
                  </div>
                  <div className="flex flex-col justify-center mt-2 mb-2">
                    <label htmlFor="objetivoGeneral">Objetivo General</label>
                    <Field
                      name="objetivoGeneral"
                      id="objetivoGeneral"
                      className=" appearance-none rounded-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                    ></Field>
                  </div>

                  <div className="flex flex-col justify-center mt-2 mb-2">
                    <label htmlFor="objetivosEspecificos">
                      Objetivos Especificos
                    </label>
                    <FieldArray
                      name="objetivosEspecificos"
                      render={(arrayHelpers) => (
                        <div className="max-h-60 overflow-y-scroll scrollbar flex flex-col">
                          {values.objetivosEspecificos &&
                          values.objetivosEspecificos.length > 0 ? (
                            values.objetivosEspecificos.map(
                              (objetivo, index) => (
                                <div key={index} className="flex m-2 w-11/12">
                                  <Field
                                    name={`objetivosEspecificos.${index}`}
                                    className=" appearance-none rounded-none px-3 py-2 border w-9/12 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                                  />
                                  <button
                                    className="group relative rounded-full w-8 h-8 flex justify-center items-center ml-2 border border-transparent text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    className="group relative rounded-full w-8 h-8 flex justify-center items-center ml-2 border border-transparent text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              class="group relative w-3/5 flex justify-center ml-2  py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              {/* show this when user has removed all friends from the list */}
                              Agregar objetivos especificos *
                            </button>
                          )}
                        </div>
                      )}
                    ></FieldArray>
                    <div className="flex flex-col justify-center mt-2 mb-2">
                      <label htmlFor="presupuesto">Presupuesto</label>
                      <Field
                        name="presupuesto"
                        id="presupuesto"
                        className=" appearance-none rounded-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                        type="number"
                      ></Field>
                    </div>
                    <div className="flex justify-center mt-14 mb-2">
                      <button
                        type="submit"
                        class="group relative w-1/3 flex justify-center ml-2  py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                      >
                        Crear Proyecto
                      </button>
                      <button
                        type="button"
                        class="group relative w-1/3 flex justify-center ml-2  py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                        onClick={handleClose}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            ></Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCrearProyectos;
