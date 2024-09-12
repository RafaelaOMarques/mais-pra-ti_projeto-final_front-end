import React, { useState } from "react";
import '../../styles/usuario.css'

export default function Acesso(){
 const [email, defEmail] = useState(''), [senha, defSenha] = useState(''), [lembrarSenha, defLembrarSenha] = useState(false);
	const [emailValido, defEmailValido] = useState(false);

	const Checagem = () => {
		if (email.length > 0) { defEmailValido(false); if (/\S+@\S+\.\S+/.test(email)) { defEmailValido(true); } }else{defEmailValido(false); }
	}
	
	const Enviar = (e) => {
		e.preventDefault();
		if (email == localStorage.getItem('email') && senha == localStorage.getItem('senha')) {
   localStorage.setItem('lembrarSenha', lembrarSenha);
			localStorage.setItem('autentico', true);
			window.location.href='/'
			}
		else { localStorage.setItem('autentico', false); defEmail(''); defSenha(''); alert('Email ou senha invalida!')}
	}


return(
<div className="usuario_div_principal">
<form onSubmit={Enviar}>
<div>
<label className="dados_usuario">Email<input style={{ borderColor: emailValido ? '#DDD' : '#A00' }} onKeyUp={Checagem} value={email} onChange={e=>{defEmail(e.target.value)}} autoComplete="current-email" name="email" required placeholder="seu@email.com" type="email" /></label>
<label className="dados_usuario">Senha<input name="senha" value={senha} onChange={(e) => { defSenha(e.target.value) }} required placeholder="senha" type="password" /></label>
<label className="label_lembrar_senha"><input className="input_lembrar_senha" type="checkbox" onChange={e=>{defLembrarSenha(e.target.checked)}} checked={lembrarSenha} /> <span className="span_lembrar_senha"></span>Lembrar meu login</label>
<div id="botoes_acesso">
<a className="botoes_usuario botoes_claros" href='/Cadastro'>Criar conta</a>
 <button className="botoes_usuario" type="submit">Entrar</button>
</div>
<a style={{color:'#D60', fontSize:'large'}} href='/Recuperacao'>Esqueceu sua senha?</a>
</div>
</form>
</div>
)
}