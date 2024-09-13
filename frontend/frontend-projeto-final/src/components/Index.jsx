import '../styles/usuario.css'
export default function Index() {
 return (
  <div className="usuario_div_principal">
   <p>Sejá bem vindo {localStorage.getItem('nome')}!</p>
  </div>
 )
}