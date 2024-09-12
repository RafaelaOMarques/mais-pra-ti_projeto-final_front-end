// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import App from "./App";
import React from "react";
import Index from './components/Index'
import ReactDOM from "react-dom/client";
import Acesso from './components/Usuario/Acesso'
import Cadastro from './components/Usuario/Cadastro'
import Recuperacao from './components/Usuario/Recuperacao'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));

const rotas = createBrowserRouter([
  {path:"/", element:<App/>, children:[
    {path:'/Acesso', element:localStorage.getItem('autentico')=="true"?<Index/>:<Acesso/>},
    {path:'/Cadastro', element:<Cadastro/>},
    {path:'/Recuperacao', element:<Recuperacao/>}
  ]}
])
root.render(
  <React.StrictMode>
    <RouterProvider router={rotas}/>
  </React.StrictMode>
);
