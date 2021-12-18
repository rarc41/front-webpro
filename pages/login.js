import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

const AUTENTICACION = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
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

toast.configure();
const Login = () => {
  // Mutation para autenticar usuario
  const [autenticarUsuario] = useMutation(AUTENTICACION,
    // reiniciar cache con el nuevo usuario
    {
      fetchPolicy: "no-cache",
    }
    );
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
    }),

    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        console.log(data);
        toast.success("Autenticado correctamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Guardar token en localStorage
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);

        // Redireccionar al usuario a la pagina principal
        setTimeout(() =>{
          router.push("/");
        }, 3000)
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
    <Head>
      <title>WebProject</title>
      <link rel="icon" href="/media/logo_small_icon_only.png" />
    </Head>

    <main className="flex items-center justify-center bg-gray-100 px-5 py-5 text-center rounded-xl">
    <div className="flex items-center bg-gray-100 w-auto h-[32rem]">
    <img
          src="/media/icono-login.png"
          alt="Logo Google"
          className="mx-auto h-80 w-auto"
        />
    </div>

    <div className="flex flex-col items-center justify-center bg-gray-200 text-center px-5 py-3 rounded-xl">
        <div>
          <a href="/">
            <img
              src="/media/logo_large.png"
              alt="Logo"
              className="mx-auto h-20 w-auto"
            />
          </a>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                  placeholder="Correo Electrónico"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-iyellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recuérdame
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-gray-700 hover:text-gray-900"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="max-w-md w-full py-2">
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <div className="flex items-center justify-start">
                <img
                  src="/media/google_logo.png"
                  alt="Logo Google"
                  className="h-6 w-6"
                />
                <span className="mx-4">Continúa con Google</span>
              </div>
            </button>
          </div>
        </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                Inicia sesión
              </button>
            </div>

            <div className="flex items-center justify-center">
              <span>¿No tienes cuenta?</span>
              <a href="/registro">
                <span className="font-medium text-gray-700 hover:text-gray-900 px-1">
                  Regístrate
                </span>
              </a>
            </div>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
