import { Link } from "react-router-dom"
import img_busca from '/Busca.png'
import img_logo from '/Logo.png'
import img_menu from '/Menu.png'
import img_tema from '/Tema.png'
import img_usuario from '/Usuario.png'


export default function Header(){

return(
<header>
<div>
<Link><img src={img_menu} alt="Menu" /></Link>
<Link to={'/'}><img src={img_logo} alt="+API"/>+API</Link>
</div>
<div>
<div id="div_search">
<input type="search" name="search"/>
<Link><img src={img_busca} alt="Busca"/></Link>
</div>
<Link><img src={img_usuario} alt="Usuario" /></Link>
<Link><img src={img_tema} alt="Tema" /></Link>
</div>
</header>
)
}