import { useState, useEffect } from "react";
import "./MinhaApi.css";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function MinhaApi() {
  const [statusHttpRespostaCriar, defStatusHttpRespostaCriar] = useState("");
  const [httpResposta, defHttpResposta] = useState("");
  const [nomeApi, defNomeApi] = useState("");
  const [descricaoApi, defDescricaoApi] = useState("");
  const [metodosApi, defMetodosApi] = useState("");
  const [linkApi, defLinkApi] = useState("");
  const [imagemApi, defImagemApi] = useState("");

  const [erros, defErros] = useState({
    nome: false,
    descricao: false,
    metodos: false,
    link: false,
    imagem: false,
  });

  const [validacoes, defValidacoes] = useState({
    nome: false,
    descricao: false,
    metodos: false,
    link: false,
    imagem: false,
  });

  const validarCampos = () => {
    const novosErros = { ...erros };
    const novasValidacoes = { ...validacoes };
    let camposValidos = true;

    // Validação dos campos
    const validacao = [
      { campo: 'nome', valor: nomeApi, condicao: nomeApi.length > 3 && /\S+/.test(nomeApi) },
      { campo: 'descricao', valor: descricaoApi, condicao: descricaoApi.length > 3 },
      { campo: 'metodos', valor: metodosApi, condicao: metodosApi.length > 0 },
      { campo: 'link', valor: linkApi, condicao: /^https?:\/\/[^\/\s]+?\..+$/i.test(linkApi) },
      { campo: 'imagem', valor: imagemApi, condicao: /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?\/.*\.(jpg|jpeg|png|gif)$/i.test(imagemApi) }
    ];

    validacao.forEach(({ campo, valor, condicao }) => {
      // Só exibir erro se o campo tiver pelo menos 1 caractere
      if (valor.length > 0) {
        novasValidacoes[campo] = condicao;
        novosErros[campo] = !condicao;
        if (!condicao) { camposValidos = false; }
      } else {
        novasValidacoes[campo] = false;
        novosErros[campo] = false; // Não exibe erro se o campo estiver vazio
      }
    });

    defErros(novosErros);
    defValidacoes(novasValidacoes);

    return camposValidos;
  };

  const CriarApi = async () => {
    const token = localStorage.getItem("autenticado");
    if (!validarJWT(token)) {
      defHttpResposta("Token inválido ou expirado. Faça login novamente.");
      return;
    }
    try {
      const resposta = await fetch(`${API_URL}/apis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: nomeApi,
          description: descricaoApi,
          methods: metodosApi,
          link: linkApi,
          icon: imagemApi,
        }),
      });

      const status = resposta.status;
      defStatusHttpRespostaCriar(status);
      defHttpResposta(resposta.ok ? "API criada com sucesso!" : "Erro ao criar API. Tente novamente!");
    } catch (error) {
      defHttpResposta("Erro de conexão. Tente novamente!");
    }
    Limpar();
  };

  const validarJWT = (token) => {
    try {
      if (!token) { return false; }
      const dados = decodificarJWT(token);
      const agora = Math.floor(Date.now() / 1000);
      return dados.exp >= agora // Ver se está expirado
    } catch (error) { return false; }
  };

  const decodificarJWT = (token) => {
    const partes = token.split('.');
    if (partes.length !== 3) { localStorage.removeItem("autenticado"); throw new Error("Token JWT inválido"); }
    const payload = partes[1];
    const dados = JSON.parse(atob(payload));
    return dados;
  };

  const Enviar = (e) => {
    e.preventDefault();
    defHttpResposta('');
    if (!validarCampos()) {
      return;
    }
    CriarApi();
  };


  useEffect(() => {
    validarCampos();
  }, [nomeApi, descricaoApi, metodosApi, linkApi, imagemApi]);

  const Cancelar = () => {
    window.location.href = "/";
    Limpar();
  }

  const Limpar = () => {
    defNomeApi("");
    defDescricaoApi("");
    defMetodosApi("");
    defLinkApi("");
    defImagemApi("");
    defErros({
      nome: false,
      descricao: false,
      metodos: false,
      link: false,
      imagem: false,
    });
    defValidacoes({
      nome: false,
      descricao: false,
      metodos: false,
      link: false,
      imagem: false,
    });
  }

  return (
    <div id="Minhaapi">
      <form method="post">

        {/* Nome */}
        <label className="dados_api">
          Nome da sua API
          <input
            className={erros.nome ? "input_error" : ""}
            value={nomeApi}
            onChange={(e) => defNomeApi(e.target.value)}
            placeholder="Nome da API"
            required
          />
          {erros.nome && <span className="avisosCadastro">Nome deve ter mais de 3 caracteres</span>}
        </label>

        {/* Descrição */}
        <label className="dados_api">
          <p>Descrição (Max. <i>300</i> caracteres)</p>
          <textarea
            className={erros.descricao ? "textarea_descricao input_error" : "textarea_descricao"}
            value={descricaoApi}
            onChange={(e) => defDescricaoApi(e.target.value)}
            placeholder="Digite a descrição aqui"
            maxLength="300"
            required
          />
          {erros.descricao && <span className="avisosCadastro">Descrição deve ter mais de 3 caracteres</span>}
        </label>

        {/* Métodos */}
        <label className="dados_api">
          <p>Métodos ( <i>GET</i>, <i>POST</i>, ... )</p>
          <input
            className={erros.metodos ? "input_error" : ""}
            value={metodosApi}
            onChange={(e) => defMetodosApi(e.target.value)}
            placeholder="Métodos da API"
            required
          />
          {erros.metodos && <span className="avisosCadastro">Métodos não podem ser vazios</span>}
        </label>

        {/* Link */}
        <label className="dados_api">
          <p>Link ( Use / :  https:<i>//</i> )</p>
          <input
            className={erros.link ? "input_error" : ""}
            value={linkApi}
            onChange={(e) => defLinkApi(e.target.value)}
            placeholder="https://sua.api/"
            required
          />
          {erros.link && <span className="avisosCadastro">Link inválido ou não encontrado</span>}
        </label>

        {/* Ícone */}
        <label className="dados_api">
          <p>Logo ( URL : endereço/imagem<i> . jpg jpeg png gif</i> )</p>
          <input
            className={erros.imagem ? "input_error" : ""}
            value={imagemApi}
            onChange={(e) => defImagemApi(e.target.value)}
            placeholder="https://sua.api.imagem.jpg"
            required
          />
          {erros.imagem && <span className="avisosCadastro">Imagem inválido ou URL não é uma imagem</span>}
        </label>
        {imagemApi && (
          <img
            src={imagemApi}
            alt="Ícone da API"
            style={{ width: '350px', height: '250px' }}
          />
        )}
        {/* Botões */}
        <div id="Botoes">
          <button className="botoes_api" type="button" onClick={Cancelar}>
            Cancelar
          </button>
          <button className="botoes_api" type="button" onClick={Enviar}>
            Salvar API
          </button>
        </div>
        {httpResposta && <p style={{ color: "var(--erro-validar-dados-usuario)", textAlign: "center" }}>{httpResposta}</p>}
      </form>
    </div>
  );
}
