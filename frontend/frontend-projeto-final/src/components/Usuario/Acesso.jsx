import React, { useState, useContext, useEffect, useRef } from "react";
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import icoSenhaInvisivel from "../../assets/senhaInvisivel.png";
import icoSenhaVisivel from "../../assets/senhaVisivel.png";
import "../../styles/usuario.css";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Acesso() {
  const [statusHttpResposta, defStatusHttpResposta] = useState("");
  const [httpResposta, defHttpResposta] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);

  const [usuario, defUsuario] = useState("");
  const [senha, defSenha] = useState("");
  const [lembrarSenha, defLembrarSenha] = useState(false);
  const [usuarioValido, defUsuarioValido] = useState(false);
  const [senhaVisivel, defSenhaVisivel] = useState(false);
  const [usuarioAvisoErro, defUsuarioAvisoErro] = useState(false);

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

      const status = resposta.status;
      defStatusHttpResposta(status);

      if (!resposta.ok) return;

      const data = await resposta.json();
      if (status >= 500) {
        defHttpResposta("Estamos em manutenção!");
      } else if (status >= 400) {
        defHttpResposta("Dados incorretos ou já cadastrados!");
      } else if (status === 200 && data) {
        const isValid = validarJWT(data.token);
        if (!isValid) {
          defHttpResposta("Em manutenção, tente mais tarde!");
          localStorage.removeItem("autenticado");
          return;
        }

        localStorage.setItem("autenticado", data.token);
        
        window.location.href = sessionStorage.getItem("rotaDestino") || "/";
      }
    } catch (error) {
      defHttpResposta("Erro ao criar usuário");
    }
  };

  const decodificarJWT = (token) => {
    const partes = token.split('.');
    if (partes.length !== 3) {
      throw new Error("Token JWT inválido");
    }

    const payload = partes[1];
    const dados = JSON.parse(atob(payload));
    return dados;
  };

  const validarJWT = (token) => {
    try {
      const dados = decodificarJWT(token);
      const agora = Math.floor(Date.now() / 1000);
      if (dados.exp < agora) {
        console.error("Token expirado");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      return false;
    }
  };

  useEffect(() => {
    usuarioInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (statusHttpResposta >= 500) {
      defHttpResposta("Em manutenção, tente mais tarde!");
    } else if (statusHttpResposta >= 400) {
      defHttpResposta("Dados incorretos ou não cadastrados!");
    } else if (statusHttpResposta >= 200) {
      window.location.href = "/";
    }
  }, [statusHttpResposta]);

  useEffect(() => {
    if (httpResposta.length > 1) {
      const timer = setTimeout(() => {
        defHttpResposta("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [httpResposta]);

  return (
    <div className={`usuario_div_principal ${isDarkMode ? "dark-mode" : ""}`}>
      <button id="btVoltar" onClick={() => window.location.href="/"} className="setasNavegar"></button>
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
            <i
              className="ver_senha"
              onClick={() => defSenhaVisivel(!senhaVisivel)}
              style={{
                backgroundImage: `url("${senhaVisivel ? icoSenhaVisivel : icoSenhaInvisivel}")`
              }}
            ></i>
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
          {httpResposta && (
            <p style={{ color: "var(--erro-validar-dados-usuario)", textAlign: "center" }}>
              {httpResposta}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
