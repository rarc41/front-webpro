import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children, setSeccion }) => {
  // hook de router
  const router = useRouter();

  return (
    <>
      <Head>
        <title>WP - Administrador de Proyectos</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
          // rel="icon"
          // href="/media/logo_small_icon_only.png"
        />
      </Head>
      {router.pathname === "/login" || router.pathname === "/registro" ? (
        <div className="min-h-screen flex flex-col justify-center">
          <div className="">{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar setSeccion={setSeccion}/>
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-sreen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
