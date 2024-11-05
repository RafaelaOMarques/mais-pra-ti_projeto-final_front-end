import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import icoSenhaInvisivel from "../../assets/senhaInvisivel.png"
import icoSenhaVisivel from "../../assets/senhaVisivel.png"
import "../../styles/usuario.css";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Acesso() {
  const [statusHttpResposta, defStatusHttpResposta] = useState("");
  const { isDarkMode } = useContext(DarkModeContext); // Usa o contexto de tema

  const [usuario, defUsuario] = useState("");
  const [senha, defSenha] = useState("");
  const [lembrarSenha, defLembrarSenha] = useState(false);
  const [usuarioValido, defUsuarioValido] = useState(false);
  const [senhaVisivel, defSenhaVisivel] = useState(false);
  const [usuarioAvisoErro, defUsuarioAvisoErro] = useState(false);
  const [httpResposta, defHttpResposta] = useState("");

  const usuarioInputRef = useRef(null);

  const Checagem = () => {
    if (usuario.length > 4) {
      defUsuarioValido(true);
      defUsuarioAvisoErro(false);
    } else {
      defUsuarioValido(false);
      defUsuarioAvisoErro(true);
    }
  };

  const Enviar = (e) => {
    e.preventDefault();
    if (usuarioValido && senha.length >= 8) {
      localStorage.setItem("lembrarSenha", lembrarSenha);
      Acessar();
    } else {
      localStorage.setItem("autenticado", "");
      defUsuario("");
      defSenha("");
    }
  };

  const Acessar = async () => {
    try {
      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": usuario,
          "password": senha
        })
      });

      if (!resposta.ok) {
        throw new Error("\n\t>> Erro ao cadastrar: status " + resposta.status);
      }

      const data = await resposta.json();
      if (resposta && resposta.status === 200 && data) {
        localStorage.setItem("autenticado", data.token);

        // Validação do token
        const isValid = validarJWT(data.token);
        if (!isValid) {
          throw new Error("\n\t>> Token inválido");
        }

        defStatusHttpResposta(resposta.status);
      }

    } catch (error) {
      console.error("\n\t>> Erro ao criar usuário:\n" + error);
    }
  };

  // Função para decodificar um token JWT
  const decodificarJWT = (token) => {
    const partes = token.split('.');
    if (partes.length !== 3) {
      throw new Error("Token JWT inválido");
    }

    const payload = partes[1];
    const dados = JSON.parse(atob(payload));
    return dados;
  };

  // Função para validar um token JWT
  const validarJWT = (token) => {
    try {
      const dados = decodificarJWT(token);

      // Verifica se o token está expirado
      const agora = Math.floor(Date.now() / 1000);
      if (dados.exp < agora) {
        console.error("Token expirado");
        return false;
      }

      console.log("Token é válido", dados);
      return true;

    } catch (error) {
      console.error("Erro ao validar o token:", error);
      return false;
    }
  };

  useEffect(() => {
    usuarioInputRef.current.focus();
  }, []);

  // irei futuramente mandar os erros para o usuário (modal), em vez de mandar no console.
  useEffect(() => {
    if (statusHttpResposta >= 500) { console.error("Erro no servidor"); defHttpResposta("Problemas no servidor, tente mais tarde!"); }
    else if (statusHttpResposta >= 400) { console.error("Erro de cliente"); }
    else if (statusHttpResposta >= 300) { console.log("Redirecionamento"); }
    else if (statusHttpResposta >= 200) { window.location.href = "/"; }
  }, [statusHttpResposta])

  let navegar = useNavigate();

  return (
    <div className={`usuario_div_principal ${isDarkMode ? "dark-mode" : ""}`}>
      <button id="btVoltar" onClick={() => { navegar("/"); }}></button>
      <form onSubmit={Enviar}>
        <div className="usuario_form_container">
          <label className="dados_usuario">
            Usuário
            <input
              className={!usuarioValido ? "input-error" : ""}
              onKeyUp={Checagem}
              value={usuario}
              onChange={(e) => defUsuario(e.target.value)}
              autoComplete="current-username"
              name="username"
              placeholder="Nome do usuário"
              type="text"
              ref={usuarioInputRef}
              required
            />
            <span className="avisosCadastro">{usuarioAvisoErro ? "Digite um email válido" : ""}</span>
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
