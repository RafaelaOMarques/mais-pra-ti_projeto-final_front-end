import { useState } from "react";
import "../../styles/usuario.css";

export default function Cadastro() {
  const [nome, defNome] = useState(""),
    [email, defEmail] = useState(""),
    [senha, defSenha] = useState(""),
    [lembrarSenha, defLembrarSenha] = useState(false);

  const [nomeValido, defNomeValido] = useState(false);
  const [emailValido, defEmailValido] = useState(false);
  const [senhaValida, defSenhaValida] = useState(false);

  const [nomeAvisoErro, defNomeAvisoErro] = useState(false);
  const [emailAvisoErro, defEmailAvisoErro] = useState(false);
  const [senhaAvisoErro, defSenhaAvisoErro] = useState(false);

  const Checagem = () => {
    if (nome.length > 0) {
      if (/\S+/.test(nome) && nome.length > 4) {
        defNomeValido(true);
        defNomeAvisoErro(false);
      } else {
        defNomeAvisoErro(true);
      }
    } else {
      defNomeValido(false);
      defNomeAvisoErro(false);
    }

    if (email.length > 0) {
      if (/\S+@\S+\.\S+/.test(email)) {
        defEmailValido(true);
        defEmailAvisoErro(false);
      } else {
        defEmailAvisoErro(true);
      }
    } else {
      defEmailValido(false);
      defEmailAvisoErro(false);
    }

    if (senha.length > 0) {
      if (senha.length > 7 && senha.length < 15) {
        defSenhaValida(true);
        defSenhaAvisoErro(false);
      } else {
        defSenhaAvisoErro(true);
      }
    } else {
      defSenhaValida(false);
      defSenhaAvisoErro(false);
    }
  };

  const Enviar = (e) => {
    e.preventDefault();
    localStorage.setItem("autentico", false);
    if (nomeValido && emailValido && senhaValida) {
      localStorage.setItem("autentico", true);
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);
      localStorage.setItem("senha", senha);
      localStorage.setItem("lembrarSenha", lembrarSenha);
      window.location.href = "/";
    }
    redefinirCampos();
  };

  const redefinirCampos = () => {
    defNome("");
    defEmail("");
    defSenha("");
    defNomeValido(false);
    defEmailValido(false);
    defSenhaValida(false);
  };

  return (
    <div className="usuario_div_principal">
      <form onSubmit={Enviar}>
        <div>
          <label className="dados_usuario">
            Nome de usuário
            <input
              className={nomeAvisoErro ? "input_error" : ""}
              onKeyUp={Checagem}
              value={nome}
              onChange={(e) => {
                defNome(e.target.value);
                Checagem();
              }}
              autoComplete="name"
              name="name"
              required
              placeholder="Nome"
              type="text"
            />
          </label>
          <label className="dados_usuario">
            Email
            <input
              className={emailAvisoErro ? "input_error" : ""}
              onKeyUp={Checagem}
              value={email}
              onChange={(e) => {
                defEmail(e.target.value);
                Checagem();
              }}
              autoComplete="email"
              name="email"
              required
              placeholder="seu@email.com"
              type="email"
            />
          </label>
          <label className="dados_usuario">
            Senha
            <input
              className={senhaAvisoErro ? "input_error" : ""}
              onKeyUp={Checagem}
              value={senha}
              onChange={(e) => {
                defSenha(e.target.value);
                Checagem();
              }}
              autoComplete="password"
              name="password"
              required
              placeholder="8 a 14 carácteres"
              type="password"
            />
          </label>
          <label className="label_lembrar_senha">
            <input
              className="input_lembrar_senha"
              type="checkbox"
              onChange={(e) => {
                defLembrarSenha(e.target.checked);
              }}
              checked={lembrarSenha}
            />{" "}
            <span className="span_lembrar_senha"></span>Lembrar meu login
          </label>
          <div className="container-flex-column">
            <button
              className="botoes_usuario botoes_claros botoes-full"
              style={{ width: "100%" }}
              type="submit"
            >
              Criar conta
            </button>
            <button
              className="botoes_usuario botoes-full"
              type="button"
              onClick={() => {
                window.location.href = "/Acesso";
              }}
            >
              Voltar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
