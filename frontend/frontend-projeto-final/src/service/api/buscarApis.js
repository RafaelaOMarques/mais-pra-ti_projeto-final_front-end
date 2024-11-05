const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchApis = async (page, size) => {
  try {
    const response = await fetch(
      `${API_URL}/apis?page=${page}&size=${size}&sort=name,asc`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar APIs: ${response.statusText}`);
    }
    console.log(response);
    const data = await response.json();

    // Verifica se o campo "content" existe e retorna apenas os dados necessários
    if (data && data.content) {
      return data.content.map((api) => ({
        nome: api.name,
        descricao: api.description,
        link: api.link,
        imageUrl: api.icon,
        id: api.id
      }));
    }

    // Retorna uma lista vazia se "content" não estiver presente
    return [];
  } catch (error) {
    console.error("Erro ao buscar APIs:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
};