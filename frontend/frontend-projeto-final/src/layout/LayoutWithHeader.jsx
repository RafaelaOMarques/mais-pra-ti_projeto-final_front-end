import React from "react";
import { DarkModeProvider } from "../context/DarkModeContext/DarkModeContext";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const LayoutWithHeader = () => {
  return (
    <DarkModeProvider>
      <Header />
      <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
    </DarkModeProvider>
  );
};

export default LayoutWithHeader;
