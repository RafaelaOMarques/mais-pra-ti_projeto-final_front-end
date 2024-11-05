import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import Acesso from "./components/Usuario/Acesso";
import Cadastro from "./components/Usuario/Cadastro";
import Recuperacao from "./components/Usuario/Recuperacao";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWithHeader from "./layout/LayoutWithHeader";
import LayoutWithoutHeader from "./layout/LayoutWithoutHeader";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rotas = createBrowserRouter([
  { path: "/", element: <LayoutWithHeader />, },
  {
    path: "/",
    element: <LayoutWithoutHeader />, // Layout sem Header
    children: [
      { path: "/Acesso", element: <Acesso /> },
      { path: "/Cadastro", element: <Cadastro /> },
      { path: "/Recuperacao", element: <Recuperacao /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>
);
