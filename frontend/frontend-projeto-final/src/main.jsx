import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import Acesso from "./components/Usuario/Conta/Acesso";
import Cadastro from "./components/Usuario/Conta/Cadastro";
import Recuperacao from "./components/Usuario/Conta/Recuperacao";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWithHeader from "./layout/LayoutWithHeader";
import LayoutWithoutHeader from "./layout/LayoutWithoutHeader";
import Perfil from "./components/Usuario/Perfil/Perfil";
import MinhasApis from "./components/Usuario/Gerenciar/Gerenciar";
import Termos from "./components/Usuario/Gerenciar/Termos/Termos";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rotas = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithHeader />,
    children: [
      { path: "Gerenciar/MinhasApis", element: <MinhasApis /> },
      { path: "Gerenciar/Perfil", element: <Perfil /> },
      { path: "Gerenciar/Termos", element: <Termos /> },
    ],
  },
  {
    path: "/",
    element: <LayoutWithoutHeader />,
    children: [
      { path: "Acesso", element: <Acesso /> },
      { path: "Cadastro", element: <Cadastro /> },
      { path: "Recuperacao", element: <Recuperacao /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>
);
