import React from "react";
import { DarkModeProvider } from "../context/DarkModeContext/DarkModeContext";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import ListaApis from "../components/Listaapis/Listaapis";

// Mock de dados para as APIs
const mockApis = [
  {
    id: 1,
    name: "API do Clima",
    imageUrl: "https://picsum.photos/500/300", // URL de exemplo
    description: "Uma API para obter dados meteorológicos em tempo real.",
  },
  {
    id: 2,
    name: "API de Filmes",
    imageUrl: "https://picsum.photos/500/300", // URL de exemplo
    description: "API que fornece informações sobre filmes e séries.",
  },
  {
    id: 3,
    name: "API de Notícias",
    imageUrl: "https://picsum.photos/500/300", // URL de exemplo
    description: "Uma API para acessar as últimas notícias do mundo.",
  },
  {
    id: 4,
    name: "API de Música",
    imageUrl: "https://picsum.photos/500/300", // URL de exemplo
    description: "API que fornece dados sobre músicas e artistas.",
  },
  // {
  //   id: 5,
  //   name: "API de Livros",
  //   imageUrl: "https://picsum.photos/500/300", // URL de exemplo
  //   description: "Uma API para buscar informações sobre livros e autores.",
  // },
  // {
  //   id: 6,
  //   name: "API de Livros",
  //   imageUrl: "https://picsum.photos/500/300", // URL de exemplo
  //   description: "Uma API para buscar informações sobre livros e autores.",
  // },
  // {
  //   id: 7,
  //   name: "API de Livros",
  //   imageUrl: "https://picsum.photos/500/300", // URL de exemplo
  //   description: "Uma API para buscar informações sobre livros e autores.",
  // },
];

const LayoutWithHeader = () => {
  return (
    <DarkModeProvider>
      <Header />
      <Carousel apis={mockApis} />
      <ListaApis />
      <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
    </DarkModeProvider>
  );
};

export default LayoutWithHeader;
