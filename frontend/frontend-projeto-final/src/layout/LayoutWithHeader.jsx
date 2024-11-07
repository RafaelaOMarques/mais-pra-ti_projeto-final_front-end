import React, { useEffect, useState } from "react";
import { DarkModeProvider } from "../context/DarkModeContext/DarkModeContext";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import ListaApis from "../components/Listaapis/Listaapis";
import { fetchApis } from "../service/api/buscarApis"; // Importa o serviço de APIs

// Mock de dados para as APIs
// const mockApis = [
//   {
//     id: 1,
//     nome: "API do Clima",
//     imageUrl: "https://picsum.photos/500/300", // URL de exemplo
//     descricao: "Uma API para obter dados meteorológicos em tempo real.",
//     link: `https://www.api.com.br`,
//   },
//   {
//     id: 2,
//     nome: "API de Filmes",
//     imageUrl: "https://picsum.photos/400/300", // URL de exemplo
//     descricao: "API que fornece informações sobre filmes e séries.",
//     link: `https://www.api.com.br`,
//   },
//   {
//     id: 3,
//     nome: "API de Notícias",
//     imageUrl: "https://picsum.photos/300/300", // URL de exemplo
//     descricao: "Uma API para acessar as últimas notícias do mundo.",
//     link: `https://www.api.com.br`,
//   },
//   {
//     id: 4,
//     nome: "API de Música",
//     imageUrl: "https://picsum.photos/500/400", // URL de exemplo
//     descricao: "API que fornece dados sobre músicas e artistas.",
//     link: `https://www.api.com.br`,
//   },
//   {
//     id: 5,
//     nome: "API de Livros",
//     imageUrl: "https://picsum.photos/300/400", // URL de exemplo
//     descricao: "Uma API para buscar informações sobre livros e autores.",
//     link: `https://www.api.com.br`,
//   },
//   // {
//   //   id: 6,
//   //   nome: "API de Fotos",
//   //   imageUrl: "https://picsum.photos/500/300", // URL de exemplo
//   //   descricao: "Uma API para buscar informações sobre livros e autores.",
//   //   link: `https://www.api.com.br`,

//   // },
//   // {
//   //   id: 7,
//   //   nome: "API de Animes",
//   //   imageUrl: "https://picsum.photos/500/300", // URL de exemplo
//   //   descricao: "Uma API para buscar informações sobre livros e autores.",
//   //   link: `https://www.api.com.br`,
//   // },
// ];

const LayoutWithHeader = () => {
  const [apis, setApis] = useState([]);
  const [apisPopulares, setApisPopulares] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    const loadApis = async () => {
      const apisPopulares = await fetchApis(0, 5);
      const apisTotais = await fetchApis(0, 12);
      setApis(apisTotais);
      setApisPopulares(apisPopulares);
    };
    loadApis();
  }, []);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredApis = apis.filter(
    (api) =>
      api.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
      api.descricao.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <DarkModeProvider>
      <Header onSearchChange={handleSearchChange} />
      {location.pathname ==="/" && (
        <>
        <Carousel apis={apisPopulares} />
        <ListaApis apis={filteredApis} />
        </>
      )}
      <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
    </DarkModeProvider>
  );
};

export default LayoutWithHeader;
