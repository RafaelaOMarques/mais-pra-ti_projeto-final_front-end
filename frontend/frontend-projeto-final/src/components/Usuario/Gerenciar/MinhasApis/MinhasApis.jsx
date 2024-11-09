import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MinhasApis.css"

const MinhasApis = () => {
   const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null significa "em carregamento"

  useEffect(() => {
    const token = localStorage.getItem("autenticado");

    const validarJWT = (token) => {
      if (!token) return false;
      try {
        const partes = token.split(".");
        if (partes.length !== 3) return false;
        const payload = JSON.parse(atob(partes[1]));
        const agora = Math.floor(Date.now() / 1000);
        return payload.exp > agora;
      } catch (error) {
        return false;
      }
    };

    if (!validarJWT(token)) {
      navigate("/Acesso"); // Redireciona se o token for inválido
      return; // Impede o código abaixo de ser executado
    }

    setIsAuthenticated(true); // Usuário autenticado
  }, [navigate]);

  if (isAuthenticated === null) {
    return <p>Carregando...</p>; // Enquanto verifica a autenticação, mostra "Carregando..."
  }


  return (
    <div>
      <h2>Minhas APIs</h2>
      <p>Conteúdo relacionado às suas APIs</p>
    </div>
  );
};

export default MinhasApis;
