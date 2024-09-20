import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import icoSenhaInvisivel from "../../assets/senhaInvisivel.png"
import icoSenhaVisivel from "../../assets/senhaVisivel.png"
import "../../styles/usuario.css";

export default function Acesso() {
  const { isDarkMode } = useContext(DarkModeContext); // Usa o contexto de tema

  const [email, defEmail] = useState("");
  const [senha, defSenha] = useState("");
  const [lembrarSenha, defLembrarSenha] = useState(false);
  const [emailValido, defEmailValido] = useState(false);
  const [senhaVisivel, defSenhaVisivel] = useState(false);
  const [emailAvisoErro, defEmailAvisoErro] = useState(false);

  const Checagem = () => {
    if (email.length > 0) {
      defEmailValido(false);
      if (/\S+@\S+\.\S+/.test(email)) {
        defEmailAvisoErro(false);
        defEmailValido(true);
      } else {
        defEmailAvisoErro(true);
      }
    } else {
      defEmailValido(false);
    }
  };

  const Enviar = (e) => {
    e.preventDefault();
    if (
      email === localStorage.getItem("email") &&
      senha === localStorage.getItem("senha")
    ) {
      localStorage.setItem("lembrarSenha", lembrarSenha);
      localStorage.setItem("autenticado", true);
      window.location.href = "/";
    } else {
      localStorage.setItem("autenticado", false);
      defEmail("");
      defSenha("");
      alert("Email ou senha inválida!");
    }
  };

  let navegar = useNavigate();

  return (
    <div className={`usuario_div_principal ${isDarkMode ? "dark-mode" : ""}`}>
      <button id="btVoltar" onClick={() => { navegar("/"); }}></button>
      <form onSubmit={Enviar}>
        <div className="usuario_form_container">
          <label className="dados_usuario">
            Email
            <input
              className={!emailValido ? "input-error" : ""}
              onKeyUp={Checagem}
              value={email}
              onChange={(e) => defEmail(e.target.value)}
              autoComplete="current-email"
              name="email"
              placeholder="seu@email.com"
              type="email"
              required
            />
            <span className="avisosCadastro">{emailAvisoErro ? "Digite um email válido" : ""}</span>
            </label>
          <label className="dados_usuario">
            Senha
            <input
              name="senha"
              value={senha}
              onChange={(e) => defSenha(e.target.value)}
              autoComplete="current-password"
              placeholder="senha"
              type={senhaVisivel ? "text" : "password"}
              required
            />
            <i className="ver_senha" onClick={() => { defSenhaVisivel(!senhaVisivel); }} style={{ backgroundImage: `url("${senhaVisivel ? icoSenhaVisivel : icoSenhaInvisivel}")` }}></i>
          </label>
          <label className="label_lembrar_senha">
            <input
              className="input_lembrar_senha"
              type="checkbox"
              onChange={(e) => defLembrarSenha(e.target.checked)}
              checked={lembrarSenha}
            />
            <span className="span_lembrar_senha"></span>Lembrar-me
          </label>
          <div id="botoes_acesso">
            <a className="botoes_usuario botoes_claros" href="/Cadastro">
              Criar conta
            </a>
            <button className="botoes_usuario" type="submit">
              Entrar
            </button>
          </div>
          <a className="link-recuperacao" href="/Recuperacao">
            Esqueceu sua senha?
          </a>
        </div>
      </form>
    </div>
  );
}
