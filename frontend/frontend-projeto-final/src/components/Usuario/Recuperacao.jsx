import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Recuperacao() {
  const [email, defEmail] = useState("");
  const [emailValido, defEmailValido] = useState(false);
  const [emailAvisoErro, defEmailAvisoErro] = useState(false);

  const Checagem = () => {
    if (email.length > 0) {
      defEmailValido(false);
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
  };

  const Enviar = (e) => {
    e.preventDefault();
    if (emailValido) {
      alert("Email de recuperação enviado!");
      window.location.href = "/";
    }
  };

  let navegar = useNavigate();

  return (
    <div className="usuario_div_principal">
      <button id="btVoltar" onClick={()=>{navegar(-1);}}></button>
      <form onSubmit={Enviar}>
        <div>
          <label className="dados_usuario">
            Email
            <input
              className={emailAvisoErro ? "input_error" : ""}
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
            <span className="avisosCadastro">{emailAvisoErro ? "Digite um email válido" : ""}</span>
          </label>
          <div className="container-flex-column">
            <button
              className="botoes_usuario botoes_claros botoes-full"
              type="submit"
            >
              Recuperar senha
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
