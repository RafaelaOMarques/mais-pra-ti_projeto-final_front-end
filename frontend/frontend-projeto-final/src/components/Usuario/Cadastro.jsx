import { useEffect, useState } from "react";
import "../../styles/usuario.css";
import icoSenhaInvisivel from "../../assets/senhaInvisivel.png";
import icoSenhaVisivel from "../../assets/senhaVisivel.png";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Cadastro() {
  const [statusHttpRespostaCriar, defStatusHttpRespostaCriar] = useState("");
  const [statusHttpRespostaLogar, defStatusHttpRespostaLogar] = useState("");
  const [httpResposta, defHttpResposta] = useState("");
  const [usuario, defNome] = useState("");
  const [cpf, defCpf] = useState("");
  const [email, defEmail] = useState("");
  const [DDD, defDDD] = useState("");
  const [telefone, defTelefone] = useState("");
  const [senha, defSenha] = useState("");
  const [lembrarSenha, defLembrarSenha] = useState(false);
  const [senhaVisivel, defSenhaVisivel] = useState(false);

  const [erros, setErros] = useState({
    nome: false,
    cpf: false,
    email: false,
    DDD: false,
    telefone: false,
    senha: false,
  });

  const [validacoes, setValidacoes] = useState({
    nome: false,
    cpf: false,
    email: false,
    DDD: false,
    telefone: false,
    senha: false,
  });

  const DDDValidos = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41',
    '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '68', '69', '71',
    '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '88', '91', '93', '94', '96', '97', '98', '99'
  ];

  const validarCampos = () => {
    const novosErros = { ...erros };
    const novasValidacoes = { ...validacoes };

    // Validação do nome
    if (usuario.length > 4 && /\S+/.test(usuario)) {
      novasValidacoes.nome = true;
      novosErros.nome = false;
    } else {
      novasValidacoes.nome = false;
      novosErros.nome = usuario.length > 0;
    }

    // Validação do CPF
    const cpfNumeros = cpf.replace(/[.\-]/g, '');
    if (/^\d{11}$/.test(cpfNumeros)) {
      novasValidacoes.cpf = true;
      novosErros.cpf = false;
    } else {
      novasValidacoes.cpf = false;
      novosErros.cpf = cpf.length > 0;
    }

    // Validação do email
    if (/\S+@\S+\.\S+/.test(email)) {
      novasValidacoes.email = true;
      novosErros.email = false;
    } else {
      novasValidacoes.email = false;
      novosErros.email = email.length > 0;
    }

    // Validação do DDD
    if (/^\d{2}$/.test(DDD) && DDDValidos.includes(DDD)) {
      novasValidacoes.DDD = true;
      novosErros.DDD = false;
    } else {
      novasValidacoes.DDD = false;
      novosErros.DDD = DDD.length > 0;
    }

    // Validação do telefone
    const telefoneNumeros = telefone.replace(/\D/g, '');
    if (/^\d{8,9}$/.test(telefoneNumeros)) {
      novasValidacoes.telefone = true;
      novosErros.telefone = false;
    } else {
      novasValidacoes.telefone = false;
      novosErros.telefone = telefone.length > 0;
    }

    // Validação da senha
    if (senha.length >= 8 && senha.length <= 14) {
      novasValidacoes.senha = true;
      novosErros.senha = false;
    } else {
      novasValidacoes.senha = false;
      novosErros.senha = senha.length > 0;
    }

    setErros(novosErros);
    setValidacoes(novasValidacoes);
  };

  const Cadastrar = async () => {
    try {
      const resposta = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": usuario,
          "cpf": cpf,
          "email": email,
          "phone": `${DDD}${telefone}`,
          "password": senha
        })
      });
      defStatusHttpRespostaCriar(resposta.status);
      if (resposta.ok) {
        await Acessar();
      }
    } catch (error) {
      defHttpResposta('Erro ao criar usuário!');
    }
  }

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

      defStatusHttpRespostaLogar(resposta.status);

      if (!resposta.ok) { return; }

      const data = await resposta.json();
      if (data && data.token) {
        localStorage.setItem("autenticado", data.token);

        // Validação do token
        const isValid = validarJWT(data.token);
        if (!isValid) {
          throw new Error("\n\t>> Token inválido");
        }
      }

    } catch (error) {
      console.error("\n\t>> Erro ao acessar usuário:\n" + error);
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

  useEffect(() => { validarCampos(); }, [usuario, cpf, email, DDD, telefone, senha]);

  useEffect(() => {
    if (statusHttpRespostaCriar >= 500) {
      console.error("\n>> Erro no servidor\t");
      defHttpResposta("Estamos em manutenção!");
    }
    else if (statusHttpRespostaCriar >= 400) {
      defHttpResposta("Dados incorretos ou já cadastrados!")
    }
    else if (statusHttpRespostaCriar >= 300) {
      console.log("\n>> Redirecionamento\t");
    }
    else if (statusHttpRespostaCriar === 200 && statusHttpRespostaLogar === 200) {
      defHttpResposta('');
      redefinirCampos();
      window.location.href = "/";
    }
  }, [statusHttpRespostaCriar, statusHttpRespostaLogar]);

  const enviar = (e) => {
    e.preventDefault();
    localStorage.setItem("autenticado", "");
    if (Object.values(validacoes).every(Boolean)) {
      Cadastrar();
    }
  };

  const redefinirCampos = () => {
    defNome("");
    defCpf("");
    defEmail("");
    defDDD("");
    defTelefone("");
    defSenha("");
    setValidacoes({
      nome: false,
      cpf: false,
      email: false,
      DDD: false,
      telefone: false,
      senha: false,
    });
  };

  const navegar = useNavigate();

  return (
    <div className="usuario_div_principal">
      <button id="btVoltar" onClick={() => navegar(-1)}></button>
      <form method="post" onSubmit={enviar}>
        <div>
          <label className="dados_usuario">
            Nome do usuário
            <input
              className={erros.nome ? "input_error" : ""}
              value={usuario}
              onChange={(e) => defNome(e.target.value)}
              autoComplete="name"
              placeholder="Nome"
              required
            />
            <span className="avisosCadastro">{erros.nome ? "Nome deve ter mais de 4 caracteres" : ""}</span>
          </label>

          <label className="dados_usuario">
            CPF
            <input
              className={erros.cpf ? "input_error" : ""}
              value={cpf}
              onChange={(e) => defCpf(e.target.value)}
              autoComplete="cpf"
              placeholder="00000000000"
              required
            />
            <span className="avisosCadastro">{erros.cpf ? "Digite um CPF válido" : ""}</span>
          </label>

          <label className="dados_usuario">
            Email
            <input
              className={erros.email ? "input_error" : ""}
              value={email}
              onChange={(e) => defEmail(e.target.value)}
              autoComplete="email"
              placeholder="seu@email.com"
              required
            />
            <span className="avisosCadastro">{erros.email ? "Digite um email válido" : ""}</span>
          </label>

          <label className="dados_usuario">
            Telefone
            <div id="tel_usuario">
              <input
                className={erros.DDD ? "input_error" : ""}
                value={DDD}
                onChange={(e) => {
                  defDDD(e.target.value);
                  if (e.target.value.length >= 2) { document.getElementById("telefone").focus(); }
                }}
                autoComplete="DDD"
                placeholder="00"
                required
              />
              <input
                id="telefone"
                className={erros.telefone ? "input_error" : ""}
                value={telefone}
                onChange={(e) => defTelefone(e.target.value)}
                autoComplete="tel"
                placeholder="000000000"
                required
              />
            </div>
            <span className="avisosCadastro">{erros.telefone ? "Número de telefone inválido" : ""}</span>
          </label>

          <label className="dados_usuario">
            Senha
            <input
              className={erros.senha ? "input_error" : ""}
              value={senha}
              onChange={(e) => defSenha(e.target.value)}
              autoComplete="password"
              placeholder="8 a 14 caracteres"
              type={senhaVisivel ? "text" : "password"}
            />
            <i
              className="ver_senha"
              onClick={() => defSenhaVisivel(!senhaVisivel)}
              style={{ backgroundImage: `url(${senhaVisivel ? icoSenhaVisivel : icoSenhaInvisivel})` }}
            ></i>
            <span className="avisosCadastro">{erros.senha ? "A senha deve ter entre 8 e 14 caracteres" : ""}</span>
          </label>

          <label className="label_lembrar_senha">
            <input
              className="input_lembrar_senha"
              type="checkbox"
              checked={lembrarSenha}
              onChange={() => defLembrarSenha(!lembrarSenha)}
            />
            <span className="span_lembrar_senha"></span>Lembrar-me
          </label>

          <button className="botoes_usuario botoes_claros botoes-full"
            style={{ width: "100%" }}
            type="submit"
          >
            Cadastrar
          </button>
          {httpResposta.length > 1 ? <p style={{ color: "var(--erro-validar-dados-usuario)" }}>{httpResposta}</p> : ""}
        </div>
      </form>
    </div>
  );
}