import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($actualizarUsuarioId: ID!, $input: UsuarioInput) {
    actualizarUsuario(id: $actualizarUsuarioId, input: $input) {
      id
      nombre
      apellido
      identificacion
      email
      rol
      estado
    }
  }
`;

const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
      rol
    }
  }
`;

const Configuracion = ({ usuario }) => {
  const { nombre, apellido, email, password } = usuario;

  const router = useRouter();

  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO, {
    update(cache, { data: { actualizarUsuario } }) {
      // obtener el objeto de cache que queremos actualizar
      console.log(cache)
      const { obtenerUsuario } = cache.readQuery({
        query: OBTENER_USUARIO,
      });

      // reescribir el cache
      cache.writeQuery({
        query: OBTENER_USUARIO,
        data: {
          obtenerUsuario: actualizarUsuario,
        },
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      nombre,
      apellido,
      email,
      password,
    },
    validationSchema: Yup.object({
      password: Yup.string().required(
        "El password es obligatorio para modificar tus datos"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await actualizarUsuario({
          variables: {
            actualizarUsuarioId: usuario.id,
            input: values,
          },
        });
        toast.success("Usuario actualizado");
        router.push("/login");
      } catch (error) {
        console.log(error);
        toast.error("Error al actualizar usuario");
      }
    },
  });

  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        class="
            flex flex-col
            bg-white
            shadow-md
            px-4
            sm:px-6
            md:px-8
            lg:px-10
            py-8
            rounded-3xl
            w-50
            max-w-md
          "
      >
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Editar Perfil
        </div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Actualiza tus datos
        </div>

        <div class="mt-10">
          <form action="#" onSubmit={formik.handleSubmit}>
            <div class="flex flex-col mb-5">
              <label
                for="text"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Nombre:
              </label>
              <div class="relative">
                <div
                  class="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                >
                  <i class="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                  placeholder="Ingrese su nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="text"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Apellido:
              </label>
              <div class="relative">
                <div
                  class="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                >
                  <i class="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                  placeholder="Ingresa Apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Correo Electrónico:
              </label>
              <div class="relative">
                <div
                  class="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                >
                  <i class="fas fa-at text-blue-500"></i>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                  placeholder="Ingrese su correo electrónico"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs tracking-wide text-gray-600"
              >
                Contraseña:
              </label>
              <div class="relative">
                <div
                  class="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                >
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                  placeholder="Ingrese su contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <span>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-xs italic">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </span>
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                class="group relative w-full flex justify-center mr-2 py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                <span class="mr-2 uppercase">Guardar</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
              {/* <button
                  type="submit"
                  class="group relative w-full flex justify-center ml-2  py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  <span class="mr-2 uppercase">Cancelar</span>
                  <span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button> */}
            </div>
          </form>
        </div>
      </div>
      <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
              inline-flex
              items-center
              text-gray-700
              font-medium
              text-xs text-center
            "
        ></a>
      </div>
    </div>
  );
};

export default Configuracion;
