import React from "react";
import { DarkModeProvider } from "../context/DarkModeContext/DarkModeContext";
import { Outlet } from "react-router-dom";

const LayoutWithoutHeader = () => {
  return (
    <DarkModeProvider>
      <Outlet /> {/* Renderiza o conteúdo das rotas filhas */}
    </DarkModeProvider>
  );
};

export default LayoutWithoutHeader;
