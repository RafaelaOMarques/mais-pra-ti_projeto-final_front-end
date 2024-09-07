import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Index from './components/Index.jsx'
import Acesso from './components/Usuario/Acesso.jsx'
import Cadastro from './components/Usuario/Cadastro.jsx'
import Recuperacao from './components/Usuario/Recuperacao.jsx'

const rotas = createBrowserRouter([
{path:'/', element:<App/>, children:[
{path:'/', element:localStorage.getItem('autentico')=="true"?<Index/>:<Acesso/>},
{path:'/Acesso', element:<Acesso/>},
{path:'/Cadastro', element:<Cadastro/>},
{path:'/Recuperacao', element:<Recuperacao/>}
]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<RouterProvider router={rotas}/>
</React.StrictMode>,
)
