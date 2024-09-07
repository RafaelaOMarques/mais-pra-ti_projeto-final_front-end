export default function Index(){
 return(
  <div id="inicio">
  <p>Sejá bem vindo {localStorage.getItem('nome')}!</p>
  </div>
 )
}