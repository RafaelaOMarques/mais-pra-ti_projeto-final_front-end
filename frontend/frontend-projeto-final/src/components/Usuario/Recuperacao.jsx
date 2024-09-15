import { useState } from "react";

export default function Recuperacao() {
  const [email, defEmail] = useState("");
  const [emailValido, defEmailValido] = useState(false);

  const Checagem = () => {
    if (email.length > 0) {
      defEmailValido(false);
      if (/\S+@\S+\.\S+/.test(email)) {
        defEmailValido(true);
      }
    } else {
      defEmailValido(false);
    }
  };

  const Enviar = (e) => {
    e.preventDefault();
    if (emailValido) {
      alert("Email de recuperação enviado!");
      window.location.href = "/";
    }
  };

  return (
    <div className="usuario_div_principal">
      <form onSubmit={Enviar}>
        <div>
          <label className="dados_usuario">
            Email
            <input
              style={{ borderColor: emailValido ? "#DDD" : "#A00" }}
              onKeyUp={Checagem}
              value={email}
              onChange={(e) => {
                defEmail(e.target.value);
              }}
              autoComplete="email"
              name="email"
              required
              placeholder="seu@email.com"
              type="email"
            />
          </label>
          <div className="container-flex-column">
            <button
              className="botoes_usuario botoes_claros botoes-full"
              type="submit"
            >
              Recuperar senha
            </button>
            <button
              className="botoes_usuario botoes-full"
              type="button"
              onClick={() => {
                window.location.href = "/";
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
