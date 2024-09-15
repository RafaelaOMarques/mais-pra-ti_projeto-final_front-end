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

  const Checagem = () => {
    if (nome.length > 0) {
      defNomeValido(/\S+/.test(nome) && nome.length > 4);
    } else {
      defNomeValido(false);
    }

    if (email.length > 0) {
      defEmailValido(/\S+@\S+\.\S+/.test(email));
    } else {
      defEmailValido(false);
    }

    if (senha.length > 0) {
      defSenhaValida(senha.length > 7 && senha.length < 15);
    } else {
      defSenhaValida(false);
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
              className={nomeValido ? "" : "input_error"}
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
              className={emailValido ? "" : "input_error"}
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
              className={senhaValida ? "" : "input_error"}
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
          </div>
        </div>
      </form>
    </div>
  );
}
