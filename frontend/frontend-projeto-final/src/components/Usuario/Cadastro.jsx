import { useState } from "react";
import "../../styles/usuario.css";
import icoSenhaInvisivel from "../../assets/senhaInvisivel.png"
import icoSenhaVisivel from "../../assets/senhaVisivel.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Cadastro() {
  const [nome, defNome] = useState(""),
    [email, defEmail] = useState(""),
    [senha, defSenha] = useState(""),
    [lembrarSenha, defLembrarSenha] = useState(false),
    [DDD, defDDD] = useState("");

    let [telefone, defTelefone] = useState(""), [cpf, defCPF] = useState("");

  const [nomeValido, defNomeValido] = useState(false);
  const [cpfValido, defCpfValido] = useState(false);
  const [emailValido, defEmailValido] = useState(false);
  const [DDDValido, defDDDValido] = useState(false);
  const [telefoneValido, defTelefoneValido] = useState(false);
  const [senhaValida, defSenhaValida] = useState(false);

  const [nomeAvisoErro, defNomeAvisoErro] = useState(false);
  const [cpfAvisoErro, defCpfAvisoErro] = useState(false);
  const [emailAvisoErro, defEmailAvisoErro] = useState(false);
  const [DDDAvisoErro, defDDDAvisoErro] = useState(false);
  const [telefoneAvisoErro, defTelefoneAvisoErro] = useState(false);
  const [senhaAvisoErro, defSenhaAvisoErro] = useState(false);
  const [senhaVisivel, defSenhaVisivel] = useState(false);

  const DDDValidos = [
    '68',                    // Acre
    '82',                    // Alagoas
    '96',                    // Amapá
    '97',                    // Amazonas
    '71', '73', '74', '75', '77', // Bahia
    '85', '88',              // Ceará
    '61',                    // Distrito Federal
    '27', '28',              // Espírito Santo
    '62', '64',              // Goiás
    '63',                    // Maranhão
    '65',                    // Mato Grosso
    '66',                    // Mato Grosso do Sul
    '31', '32', '33', '34', '35', '37', '38', // Minas Gerais
    '41', '42', '43', '44', '45', '46', // Paraná
    '83',                    // Paraíba
    '91', '93', '94',       // Pará
    '81',                    // Pernambuco
    '98', '99',              // Piauí
    '21', '22', '24',       // Rio de Janeiro
    '84',                    // Rio Grande do Norte
    '51', '53', '54', '55', // Rio Grande do Sul
    '69',                    // Rondônia
    '96',                    // Roraima
    '47', '48', '49',       // Santa Catarina
    '11', '12', '13', '14', '15', '16', '17', '18', '19', // São Paulo
    '79',                    // Sergipe
    '63',                    // Tocantins
  ];

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

    if (cpf.length > 0) {
      if (/^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(cpf)) {
        cpf = cpf.replace(/[.\-]/g, '');
        if (cpf.length === 11) {
          defCpfValido(true);
          defCpfAvisoErro(false);
        } else {
          defCpfAvisoErro(true);
        }
      } else {
        defCpfAvisoErro(true);
      }
    } else {
      defCpfValido(false);
      defCpfAvisoErro(false);
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

    if (DDD.length > 0) {
      if (/^\d{2}$/.test(DDD) && DDDValidos.includes(DDD)) {
        defDDDValido(true);
        defDDDAvisoErro(false);
      } else {
        defDDDAvisoErro(true);
      }
    } else {
      defDDDValido(false);
      defDDDAvisoErro(false);
    }

    if (telefone.length > 0) {
      if (/^(?:\d{8}|\d{9}|\d{5}-\d{4}|\d{4}-\d{4})$/.test(telefone)) {
        telefone = telefone.replace(/\D/g, '');
        if ((telefone.length === 8 || telefone.length === 9)) {
          defTelefoneValido(true);
          defTelefoneAvisoErro(false);
        } else {
          defTelefoneAvisoErro(true);
        }
      } else {
        defTelefoneAvisoErro(true);
      }
    } else {
      defTelefoneValido(false);
      defTelefoneAvisoErro(false);
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
    localStorage.setItem("autenticado", false);
    if (nomeValido && cpfValido && emailValido && DDDValido && telefoneValido && senhaValida) {
      // enviar
      // username, cpf, email, phone (DDD+telefone), password,  

      /*
      ANTIGO
      localStorage.setItem("autenticado", true);
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);
      localStorage.setItem("senha", senha);
      localStorage.setItem("lembrarSenha", lembrarSenha);
      */



      console.log("Axios");
      const API_URL = import.meta.env.VITE_BACKEND_URL;
      axios.post(`'${API_URL}/auth/signup'`,
        {
          "username": `"${nome}"`,
          "cpf": `"${cpf}"`,
          "password": `"${senha}"`,
          "phone": `"${DDD}${telefone}"`,
          "email": `"${email}"`
        }
      )
      .then(r => console.log("Retorno: " + r))
      .catch(e => console.log("Erro: " + e));
      console.log("Fim");




      window.location.href = "/";
    }
    redefinirCampos();
  };

  const redefinirCampos = () => {
    defNome("");
    defCPF("");
    defEmail("");
    defDDD("");
    defTelefone("");
    defSenha("");
    defNomeValido(false);
    defCpfValido(false);
    defEmailValido(false);
    defTelefoneValido(false);
    defDDDValido(false);
    defSenhaValida(false);
  };

  let navegar = useNavigate();

  return (
    <div className="usuario_div_principal">
      <button id="btVoltar" onClick={() => { navegar(-1); }}></button>
      <form method="post" onSubmit={Enviar}>
        <div>
          <label className="dados_usuario">
            Nome do usuário
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
            <span className="avisosCadastro">{nomeAvisoErro ? "Nome deve ter mais de 4 caracteres" : ""}</span>
          </label>

          <label className="dados_usuario">
            CPF
            <input
              className={cpfAvisoErro ? "input_error" : ""}
              onKeyUp={Checagem}
              value={cpf}
              onChange={(e) => {
                defCPF(e.target.value);
                Checagem();
              }}
              autoComplete="cpf"
              name="cpf"
              required
              placeholder="000.000.000-00"
              type="text"
            />
            <span className="avisosCadastro">{cpfAvisoErro ? "Digite um CPF válido" : ""}</span>
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
            <span className="avisosCadastro">{emailAvisoErro ? "Digite um email válido" : ""}</span>
          </label>
          <label className="dados_usuario">
            Telefone
            <div id="tel_usuario">
              <input
                className={DDDAvisoErro ? "input_error" : ""}
                onKeyUp={Checagem}
                value={DDD}
                onChange={(e) => {
                  defDDD(e.target.value);
                  Checagem();
                }}
                autoComplete="DDD"
                name="DDD"
                required
                placeholder="00"
                type="number"
              />
              <input
                className={telefoneAvisoErro ? "input_error" : ""}
                onKeyUp={Checagem}
                value={telefone}
                onChange={(e) => {
                  defTelefone(e.target.value);
                  Checagem();
                }}
                autoComplete="tel"
                name="tel"
                required
                placeholder="00000-0000"
                type="tel"
              />
            </div>
            <span className="avisosCadastro">{telefoneAvisoErro ? "Número de telefone invalido" : ""}</span>
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
              type={senhaVisivel ? "text" : "password"}
            />
            <i className="ver_senha" onClick={() => { defSenhaVisivel(!senhaVisivel); }} style={{ backgroundImage: `url("${senhaVisivel ? icoSenhaVisivel : icoSenhaInvisivel}")` }}></i>
            <span className="avisosCadastro">{senhaAvisoErro ? "Senha deve ter 8 a 14 caracteres" : ""}</span>
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
            <span className="span_lembrar_senha"></span>Lembrar-me
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
