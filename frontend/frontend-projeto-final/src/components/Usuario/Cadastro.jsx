import { useState } from "react";
import '../../styles/usuario.css'

export default function Cadastro() {
 const [nome, defNome] = useState(''),
  [email, defEmail] = useState(''),
  [senha, defSenha] = useState(''),
  [lembrarSenha, defLembrarSenha] = useState(false);

 const [nomeValido, defNomeValido] = useState(false);
 const [emailValido, defEmailValido] = useState(false);
 const [senhaValida, defSenhaValida] = useState(false);

 const Checagem = () => {
  if (nome.length > 0) { defNomeValido(false); if (/\S+/.test(nome) && nome.length > 4) { defNomeValido(true); } } else { defNomeValido(false); }
  if (email.length > 0) { defEmailValido(false); if (/\S+@\S+\.\S+/.test(email)) { defEmailValido(true); } } else { defEmailValido(false); }
  if (senha.length > 0) { defSenhaValida(false); if (senha.length > 7 && senha.length < 15) { defSenhaValida(true); } } else { defSenhaValida(false); }
 }

 const Enviar = (e) => {
  e.preventDefault();
  localStorage.setItem('autentico', false);
  if (nomeValido && nomeValido && senhaValida) {
   localStorage.setItem('autentico', true);
   localStorage.setItem('nome', nome); localStorage.setItem('email', email); localStorage.setItem('senha', senha);
   localStorage.setItem('lembrarSenha', lembrarSenha);
   window.location.href = '/'
  }
  defNome(''); defEmail(''); defSenha('');
  defNomeValido(false); defEmailValido(false); defSenhaValida(false);
 }

 return (
  <div className="usuario_div_principal">
   <form onSubmit={Enviar}>
    <div>
     <label className="dados_usuario">Nome de usuário<input style={{ borderColor: nomeValido ? '#DDD' : '#A00' }} onKeyUp={Checagem} value={nome} onChange={e => { defNome(e.target.value) }} autoComplete="name" name="name" required placeholder="Nome" type="text" /></label>
     <label className="dados_usuario">Email<input style={{ borderColor: emailValido ? '#DDD' : '#A00' }} onKeyUp={Checagem} value={email} onChange={e => { defEmail(e.target.value) }} autoComplete="email" name="email" required placeholder="seu@email.com" type="email" /></label>
     <label className="dados_usuario">Senha<input style={{ borderColor: senhaValida ? '#DDD' : '#A00' }} onKeyUp={Checagem} value={senha} onChange={e => { defSenha(e.target.value) }} autoComplete="password" name="password" required placeholder="8 a 14 carácteres" type="password" /></label>
     <label className="label_lembrar_senha"><input className="input_lembrar_senha" type="checkbox" onChange={e => { defLembrarSenha(e.target.checked) }} checked={lembrarSenha} /> <span className="span_lembrar_senha"></span>Lembrar meu login</label>
     <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button className="botoes_usuario botoes_claros" style={{ width: '100%' }} type="submit">Criar conta</button>
      <button className="botoes_usuario" style={{ width: '100%' }} onClick={() => { window.location.href = '/' }}>Voltar</button>
     </div>
    </div>
   </form>
  </div>
 )
}